# Webserver

## Dart
```dart

import 'dart:io';
import 'dart:isolate';

Future<void> main() async {
  var receivePort = ReceivePort();

  var isolate = await Isolate.spawn((SendPort sendPort) async {
    
    final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    var address = server.address.address;
    var port = server.port;
    sendPort.send("http://$address:$port");

    await for (HttpRequest request in server) {
      var path = request.uri.path;
      if (path == "/") {
        var indexH = File("index.html");
        try {
          var content = await indexH.readAsString();
          request.response.headers.contentType = ContentType.html;
          request.response.write(content);
        } catch (e) {
          print(e);
        }
      } else {
        path = path.replaceFirst('/', '');
        if (path.endsWith(".js")) {
          request.response.headers.contentType = ContentType.parse(
            "text/javascript",
          );
        } else {
          request.response.headers.contentType = ContentType.html;
        }
        var file = File(path);
        try {
          var content = await file.readAsString();
          request.response.write(content);
        } catch (e) {
          print(e);
        }
      }
      await request.response.close();
    }
    await server.close(force: true);
  }, receivePort.sendPort);

  receivePort.listen((message) {
    print("Serving on $message");

    print('\nPress any key and Enter to quit');
    stdin.readLineSync();
    isolate.kill();
    exit(0);
  });
}
```

## Odin
```go

package main

import "core:c/libc"
import "core:fmt"
import "core:net"
import "core:os"
import "core:strings"
import "core:thread"

main :: proc() {
	// the system will choose the port
	endp_0 := net.Endpoint{net.IP4_Loopback, 0}
	socket, err := net.listen_tcp(endp_0)
	if err != nil {
		fmt.panicf("Cannot create socket listener %s", err)
	}

	// Read the address with the chosen port
	endp, _ := net.bound_endpoint(socket)
	addr_str := fmt.tprintf("http://%s:%d\n", net.address_to_string(endp.address), endp.port)
	fmt.printf("Server listening at %s", addr_str)

	th := thread.create_and_start_with_poly_data(socket, proc(socket: net.TCP_Socket) {
		for {
			conn, _, err := net.accept_tcp(socket)
			if err != nil {
				fmt.println("accept error", err)
				continue
			}
			handle_connection(conn)
		}
	})

	fmt.println("\nPress a key and ENTER to quit\n")
	libc.getchar()

	thread.terminate(th, 0)
	net.close(socket)
	thread.destroy(th)
}

handle_connection :: proc(conn: net.TCP_Socket) {
	buffer := [4096]byte{}
	content_type: string

	_, err := net.recv_tcp(conn, buffer[:])
	request := string(buffer[:])
	//fmt.println("Received request:\n", request)

	lines := strings.split(request, "\n")
	for line in lines {
		if strings.has_prefix(line, "GET") {
			parts := strings.split(line, " ")
			file_buf: []byte
			err: os.Error
			if parts[1] == "/" {
				file_buf, err = os.read_entire_file_from_filename_or_err("index.html")
				if err != nil {
					fmt.printf("Cannot read index.html, %s\n", err)
					continue
				}
				content_type = "Content-Type: text/html\r\n"
			} else {
				path := parts[1][1:] // eliminate initial /
				//fmt.println(path)
				if strings.has_suffix(path, ".js") {
					content_type = "Content-Type: text/javascript\r\n"
				} else {
					content_type = "Content-Type: text/html\r\n"
				}

				file_buf, err = os.read_entire_file_from_filename_or_err(path)
				if err != nil {
					fmt.printf("Cannot read file  *%s*, %s\n", path, err)
					continue
				}
			}
			request_body := file_buf[:]
			response := fmt.tprintf(
				"HTTP/1.1 200 OK\r\n" +
				"%s" +
				"Content-Length: %d\r\n" +
				"Connection: close\r\n" +
				"\r\n%s",
				content_type,
				len(request_body),
				request_body,
			)
			net.send_tcp(conn, transmute([]byte)response)
		}
	}
	net.close(conn)
}
```

## Rust
```rust
use std::io::{BufRead, BufReader, Write, Read};

fn main() {
    let addr = start_server("static".to_string());

    println!("Serving on {}", addr);

    loop {}
}

fn start_server(rel_path: String) -> String {
    let listener = std::net::TcpListener::bind("127.0.0.1:0").expect("tcp server error");
    let addr = listener.local_addr().unwrap().clone();

    //let fh_name = "static/index.html";
    let fh_name = format!("{}{}",rel_path,"/index.html");
    let content = std::fs::read_to_string(fh_name).unwrap();


    std::thread::spawn(move || {
        for stream in listener.incoming() {
            let mut stream = stream.unwrap();

            let buf_reader = BufReader::new(&mut stream);

            let http_request: Vec<_> = buf_reader
                .lines()
                .map(|result| result.unwrap())
                .take_while(|line| !line.is_empty())
                .collect();

            let ok_response = "HTTP/1.1 200 OK\r\n";
            let js_type = "Content-Type: text/javascript\r\n";

            let strs: Vec<&str> = http_request[0].split_whitespace().collect();
            //println!("{:?}", strs); 
            if strs[0] == "GET" {
                let head = &format!("/{}/", rel_path);
                if strs[1].starts_with(head) {
                    let path = strs[1][1..].to_string(); //cut initial /

                    let mut static_content = Vec::new();
                    let mut file = std::fs::File::open(&path).expect("Unable to open file");
                    file.read_to_end(&mut static_content)
                        .expect("Unable to read");

                    let mut response= String::new();
                    if path.ends_with(".js") {
                        response = format!("{ok_response}{js_type}\r\n");
                    } else {
                        response = format!("{ok_response}\r\n"); 
                    }
                    stream.write_all(response.as_bytes()).unwrap();
                    stream.write_all(&static_content).unwrap();

                    continue;
                }
            }

            let response = format!("{}\r\n{}", ok_response, content);

            stream.write_all(response.as_bytes()).unwrap();
        }
    });

    let addr_str = format!("http://{:?}", addr);
    return addr_str;
}
```
