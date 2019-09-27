# System command

## C\#
```c#

using System;
using System.Diagnostics;

public class Program
{
    public static void Main(string[] args)
    {
        var psi = new ProcessStartInfo();
        var process = new Process(); //("cargo", "version");
        psi.Arguments = "version";
        psi.FileName = "cargo";
        psi.RedirectStandardOutput = true;
        process.StartInfo = psi;
        process.Start();

        while (!process.StandardOutput.EndOfStream)
        {
            var line = process.StandardOutput.ReadLine();
            Console.WriteLine(line);
        }
    }
}
```

## Dart
```dart

import "dart:io";

main(List<String> arguments) {
  Process.run('cargo', ['version']).then((ProcessResult result) {
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

## Python
```python

import subprocess

outp = subprocess.run(["cargo", "version"], capture_output=True, text=True)
print(outp.stdout)
```

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