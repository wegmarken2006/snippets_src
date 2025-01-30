# WEBSOCKETS

## Go
```go
package main

import (
	"fmt"
	"log"
	"time"

	"golang.org/x/net/websocket"
)

func main() {
	url := "ws://echo.websocket.events/"
	ws, err := websocket.Dial(url, "", url)

	if err != nil {
		log.Fatal(err)
	}

	defer ws.Close()

	go func() {

		// 512 byte buffer for storing the response
		var response = make([]byte, 512)

		// No. of bytes received
		var received int
		for {
			if received, err = ws.Read(response); err != nil {
				log.Fatal(err)
			}

			fmt.Printf("Received: %s\n", response[:received])
		}
	}()

	for {
		// Write the `hello` message
		if _, err := ws.Write([]byte("hello")); err != nil {
			log.Fatal(err)
		}
		time.Sleep(2 * time.Second)
	}
}
```

## Rust
```rust
//[dependencies]
//tungstenite = "0.20"
//tokio = { version = "1", features = ["full"] }
//tokio-tungstenite = "0.17"
//futures = "0.3"
//url = "2.5.4"

use std::time::Duration;
use tokio::time::timeout;
use tokio_tungstenite::connect_async;
use tokio_tungstenite::tungstenite::protocol::Message;
use futures::{SinkExt, StreamExt};
use url::Url;

#[tokio::main]
async fn main() {
    let url = Url::parse("ws://echo.websocket.events/").unwrap();
    let (mut ws_stream, _) = connect_async(url.as_str())
        .await
        .expect("Failed to connect");

    let (tx, rx) = std::sync::mpsc::channel::<String>();

    tokio::spawn(async move {
        loop {
            match timeout(Duration::from_secs(2), ws_stream.next()).await {
                Err(_) => {
                    match rx.try_recv() {
                        Ok(msg) => ws_stream.send(Message::Text(msg)).await.unwrap(),
                        Err(_) => ()
                    }
                },
                Ok(None) => {},
                Ok(Some(msg)) => match msg.unwrap() {
                    Message::Text(text) => {
                        println!("Received: {}", text);
                    }
                    _ => {}
                },
            }
        }
    });

    loop {
        std::thread::sleep(std::time::Duration::from_secs(2));
        tx.send("hello".to_string()).unwrap();
    }
}

```

