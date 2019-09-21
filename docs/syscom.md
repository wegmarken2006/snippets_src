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