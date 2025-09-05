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
        psi.Arguments = "--version";
        psi.FileName = "dotnet";
        psi.RedirectStandardOutput = true;
        psi.UseShellExecute = false;
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

void main(List<String> arguments) {
  Process.run('cargo', ['version']).then((ProcessResult result) {
    print(result.stdout);
  });
}
```

## Go
```go

package main

import (
	. "fmt"
	"os/exec"
	"runtime"
)

func main() {
	if runtime.GOOS == "linux" {
		out, _ := exec.Command("/bin/sh", "-c", "ls").Output()
		output := string(out)
		Printf("\n%s", output)
	} else {
		//windows
		out, _ := exec.Command("cmd", "/C", "dir").Output()
		output := string(out)
		Printf("\n%s", output)
	}
}
```

## Odin
```go

package main

import "core:c/libc"

main :: proc() {
	//without output capture
	if ODIN_OS == .Windows {
		libc.system("cmd.exe /C dir")
	}
	if ODIN_OS == .Linux {
		libc.system("/bin/sh -c ls")
	}

    // with output capture
	outp: []string
	if ODIN_OS == .Windows {
		outp = system_command("cmd.exe /C dir")
	}
	if ODIN_OS == .Linux {
		outp = system_command("/bin/sh -c ls")
	}
	for elem in outp {
		fmt.print(elem)
	}
}

system_command :: proc(cmd: string) -> []string {
	outp: [dynamic]string

	fp := posix.popen(strings.clone_to_cstring(cmd), "r")
	if fp == nil {
		fmt.println("open error")
	}

	buffer: [4096]u8
	// Read the output line by line
	for {
		out := posix.fgets(raw_data(buffer[:]), size_of(buffer), fp)
		if out == nil {
			break
		}
		out_cs := cstring(out)
		out_s := strings.clone_from_cstring(out_cs)
		if out_s != "\n" {
			append(&outp, out_s)
		}
		//fmt.println(string(out_s))
	}
	return outp[:]
}
```

## Python
```python

import subprocess

outp = subprocess.run(["pip", "--version"], capture_output=True, text=True)
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

    //windows only
    let output2 = Command::new("cmd")
        .args(&["/C", "dir"])
        .output()
        .expect("failed to execute process");

    println!("stdout: {}", String::from_utf8_lossy(&output2.stdout));
}
```