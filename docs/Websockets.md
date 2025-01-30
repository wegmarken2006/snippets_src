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

