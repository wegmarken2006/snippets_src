## Rust
```rust
use std::process::Command;

fn main() {

    let output = Command::new("cargo")
        .args(&["version"])
        .output()
        .expect("failed to execute process");

    println!("stdout: {}", String::from_utf8_lossy(&output.stdout));
}
```

## Dart
```dart
//fails on windows 64, dart VM 2.5.0
import "dart:io";

main(List<String> arguments) {
  Process.run('pub', ['--version']).then((ProcessResult result) {
    print(result.stdout);
  });
}
```
## Go
```go
package main

import (
	"fmt"
	"os/exec"
)

func main() {
	out, _ := exec.Command("go", "version").Output()
	output := string(out)
	fmt.Printf("\n%s", output)
}
```