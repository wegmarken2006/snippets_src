# Webserver

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
