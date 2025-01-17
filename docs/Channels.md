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