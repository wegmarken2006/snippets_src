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
```