## Rust
```rust
use std::process::Command;

fn main() {

    let output = Command::new("dir")
        .args(&["*.*"])
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
  Process.run('dir', ['*.*']).then((ProcessResult result) {
    print(result.stdout);
  });
}
```