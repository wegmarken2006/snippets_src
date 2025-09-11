# Channels

## C\#
```c#
```

## Go
```go

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	fmt.Printf("\n%d", sumPageSizes())
}

func sumPageSizes() int {
	urls := []string{
		"https://wegmarken2006.github.io/snippets/",
		"https://wegmarken2006.github.io/snippets/Cross/",
		"https://wegmarken2006.github.io/snippets/Dict/",
		"https://wegmarken2006.github.io/snippets/Execution%20time/",
	}

	var ch = make(chan int)

	for _, url := range urls {
		go getTextLen(url, ch)
	}

	total := 0
	respCount := 0
	for {
		select {
		case ln := <-ch:
			respCount++
			total = total + ln
			if respCount == len(urls) {
				return total
			}
		}
	}
}

func getTextLen(url string, ch chan int) {
	resp, err := http.Get(url)

	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)
	ch <- len(bodyBytes)
}
```

## Odin
```go
// git clone https://github.com/laytan/odin-http.git
// in this same folder

package main

import "core:fmt"
import "core:sync/chan"
import "core:thread"
import "odin-http/client"


main :: proc() {
	urls := []string {
		"https://wegmarken2006.github.io/snippets/",
		"https://wegmarken2006.github.io/snippets/Cross/",
		"https://wegmarken2006.github.io/snippets/Dict/",
		"https://wegmarken2006.github.io/snippets/Execution%20time/",
	}

	ch, err1 := chan.create(chan.Chan(int), context.allocator)
	assert(err1 == .None)
	res_ch, err2 := chan.create(chan.Chan(int), context.allocator)
	assert(err2 == .None)

	defer chan.destroy(ch)
	defer chan.destroy(res_ch)
	loops := len(urls)
	th_res := thread.create_and_start_with_poly_data3(
		chan.as_recv(ch),
		chan.as_send(res_ch),
		loops,
		receiver,
	)
	defer thread.destroy(th_res)

	threads: [dynamic]^thread.Thread
	defer delete(threads)

	for url in urls {
		th := thread.create_and_start_with_poly_data2(url, chan.as_send(ch), get_text_len)
		//defer thread.destroy(th) //NOOO, it makes threads sequential
		append(&threads, th)
	}

	thread.join_multiple(..threads[:])
	for th in threads {
		thread.destroy(th)
	}

	total, _ := chan.recv(res_ch)
	fmt.println("Total: ", total)
}

get_text_len :: proc(url: string, ch: chan.Chan(int, .Send)) {
	resp, err := get(url)
	//fmt.println(url)
	if !err {
		success := chan.send(ch, len(resp))

		if !success {
			fmt.println("Failed to send")
			return
		}
	} else {
		chan.send(ch, 0)
	}
}

receiver :: proc(ch: chan.Chan(int, .Recv), res_ch: chan.Chan(int, .Send), num: int) {
	total := 0
	for i in 0 ..< num {
		value, ok := chan.recv(ch)
		if !ok {
			break
		}
		total = total + value
		//fmt.println("[receiver] Received:", value, total)
	}
	//fmt.println("[receiver] exit:", total)
	chan.send(res_ch, total)
}

get :: proc(url: string) -> (string, bool) {
	res, err := client.get(url)
	if err != nil {
		fmt.printf("Request failed: %s\n", err)
		return "", true
	}
	defer client.response_destroy(&res)

	body, allocation, berr := client.response_body(&res)
	if berr != nil {
		fmt.printf("Error retrieving response body: %s\n", berr)
		return "", true
	}
	resp := body.(client.Body_Plain)
	defer client.body_destroy(body, allocation)

	return body.(client.Body_Plain), false
}
```

## Rust
```rust
//[dependencies]
//ureq = "0.11.2"

use std::io::Read;
use std::sync::mpsc;
use std::sync::mpsc::{Receiver, Sender};
use std::thread;

fn main() {
    sum_page_sizes();
}

fn sum_page_sizes() {
    let urls = vec![
        "https://wegmarken2006.github.io/snippets/",
        "https://wegmarken2006.github.io/snippets/Cross/",
        "https://wegmarken2006.github.io/snippets/Dict/",
        "https://wegmarken2006.github.io/snippets/Execution%20time/",
    ];
    let (tx, rx): (Sender<usize>, Receiver<usize>) = mpsc::channel();
    let mut children = Vec::new();
    let urls_len = urls.len();

    let mut total = 0;
    for url in urls {
        let tx_chan = tx.clone();

        let child = thread::spawn(move || {
            let resp = ureq::get(url).call();
            let status = resp.status();
            if status != 500 {
                let mut buffer = String::new();
                resp.into_reader()
                    .read_to_string(&mut buffer)
                    .expect("Reading error");
                let ln = buffer.len();
                tx_chan.send(ln).expect("Transmitting error");
            } else {
                tx_chan.send(0).expect("Transmitting error");
            }
        });
        children.push(child);
    }

    //Receive messages
    for _ in 0..urls_len {
        total = total + rx.recv().expect("Receiving error");
    }

    // Wait for the threads to complete any remaining work
    for child in children {
        child.join().expect("Join error");
    }

    println!("{}", total);
}
```
```rust
//channel receiver shared between threads
//using std::thread::scope and crossbeam_channel
//[dependencies]
//ureq = "2.5.0"
//crossbeam-channel = "0.5.6"

use std::io::Read;

fn main() {
    std::thread::scope(|s| {
        let urls = vec![
            "https://wegmarken2006.github.io/snippets/",
            "https://wegmarken2006.github.io/snippets/Cross/",
            "https://wegmarken2006.github.io/snippets/Dict/",
            "https://wegmarken2006.github.io/snippets/Execution%20time/",
        ];
        let (tx, rx)= crossbeam_channel::unbounded();
        let mut children = Vec::new();
        let urls_len = urls.len();

        for url in urls {
            let tx_chan = tx.clone();

            let child = s.spawn(move || {
                let r_resp = ureq::get(url).call();
                let resp = r_resp.expect("Error url");
                let status = resp.status();
                if status != 500 {
                    let mut buffer = String::new();
                    resp.into_reader()
                        .read_to_string(&mut buffer)
                        .expect("Reading error");
                    let ln = buffer.len();
                    tx_chan.send(ln).expect("Transmitting error");
                } else {
                    tx_chan.send(0).expect("Transmitting error");
                }
            });
            children.push(child);
        }

        //Receive messages
        let receiver = s.spawn(move || {
            let mut sum = 0;
            for _ in 0..urls_len {
                sum = sum + rx.recv().expect("Receiving error");
            }
            sum
        });

        // Wait for the threads to complete any remaining work
        for child in children {
            child.join().expect("Join error");
        }
        let total = receiver.join().expect("Join error");

        println!("{}", total);
    });
}
```

## V (vlang)
``` Go

import net.http

fn main() {
	sizes := sum_page_sizes()
    print("\n$sizes")
}

fn sum_page_sizes() int {
    mut urls := []string{}
	urls = [
        "https://wegmarken2006.github.io/snippets/",
        "https://wegmarken2006.github.io/snippets/Cross/",
        "https://wegmarken2006.github.io/snippets/Dict/",
        "https://wegmarken2006.github.io/snippets/Execution%20time/",
	]

    ch := chan int{}

    for _, url in urls {
        go get_text_len(url, ch)
    }

    mut total := 0
    mut resp_count := 0
    for {
        select {
        ln := <-ch {
            resp_count++
            total = total + ln
            if resp_count == urls.len {
                return total
            }
		}
        }
    }
	return total
}

fn get_text_len(url string, ch chan int) {
	resp := http.get(url) or {panic("get error $err")}

	//close?
    ch <- resp.body.len
}
```