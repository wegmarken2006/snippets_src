# Write & Read Lines

## C\#
```c#

using System;
using System.IO;

public class Program
{
    public static void Main(string[] args)
    {
        var fileName = "tmp01.txt";

        using (var f = File.CreateText(fileName))
        {
            f.WriteLine("This is\n\na text\nfile");
        }

        try
        {
            using (var f = File.OpenText(fileName))
            {
                string s;
                while ((s = f.ReadLine()) != null)
                {
                    Console.WriteLine(s);
                }
            }
        }
        catch
        {
            Console.WriteLine("Could not find {0}", fileName);
        }

    }
}
```

## Dart
```dart

import 'dart:io';

void main() async {
  var fileName = "tmp01.txt";
  var f = File(fileName);
  var sink = f.openWrite();
  sink.write("This is\n\na text\nfile");
  sink.close();

  var fRead = File(fileName);
  var lines = await fRead.readAsLines();
  
  try {
    for (var line in lines) {
      print(line);
    }
  } catch (e) {
    print("Cannot find $fileName");
  }
}
```

## Go
```go

package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	fileName := "tmp01.txt"
	file, err := os.Create(fileName)
	if err != nil {
		fmt.Printf("Can't create %s\n", fileName)
		os.Exit(0)
	}
	toWrite := []byte("This is\n\na text\nfile")
	file.Write(toWrite)
	file.Close()

	file, err = os.Open(fileName)
	if err != nil {
		fmt.Printf("Can't open %s\n", fileName)
		os.Exit(0)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Reading error: ", err)
	}
}
```

## Julia
```julia
using Printf

filename = "tmp01.txt"
try
    fwr = open(filename, "w")
    print(fwr, "This is\n\na text\nfile")
    close(fwr)        
catch
    @printf "cannot open %s\n" filename
end

try
    fwr = open(filename, "r")
    lines = readlines(fwr)
    println(lines)    
catch
    @printf "cannot read %s\n" filename
end
```

## Nim
```nim

import streams

let fileName = "tmp01.txt"
var strm = newFileStream(fileName, fmWrite)
strm.write("This is\n\na text\nfile")
strm.close()

let strmRead = newFileStream(fileName, fmRead)
var line = ""
if not isNil(strmRead):
    while strmRead.readLine(line):
      echo line
strmRead.close()
```

## Odin

```Go
package main

import "core:fmt"
import "core:os"
import "core:strings"

main :: proc() {
	file_name := "tmp01.txt"

	// Create and write to the file
	file, err := os.open(file_name, os.O_CREATE | os.O_WRONLY | os.O_TRUNC, 0666)
	if err != nil {
		fmt.printf("Can't create %s\n", file_name)
		os.exit(0)
	}

	to_write := "This is\n\na text\nfile"
	_, err = os.write_string(file, to_write)
	if err != nil {
		fmt.println("Write error:", err)
		os.exit(0)
	}
	os.close(file)

	// Open and read the file
	file, err = os.open(file_name, os.O_RDONLY, 0666)
	if err != nil {
		fmt.printf("Can't open %s\n", file_name)
		os.exit(0)
	}
	defer os.close(file)

	data, success := os.read_entire_file_from_handle(file)
	if !success {
		fmt.println("Read error:", err)
		os.exit(0)
	}

	// Split by newline and print each line
	lines := strings.split(string(data), "\n")
	for line in lines {
		fmt.println(line)
	}
}
```

## Python
```python

import os
import sys

file_name = "tmp01.txt"

try:
    with open(file_name, "w") as file:
        file.write("This is\n\na text\nfile")
except:
    print(f"Error writing  {file_name}")

try:
    with open(file_name, "r") as file:
        for line in file:
            print(line, end='')
except:
    print(f"Error reading {file_name}")
```

## Rust
```rust

use std::fs::File;
use std::io::prelude::*; //without this, no write
use std::io::BufRead;
use std::io::BufReader;
fn main() {
    let file_name = "tmp01.txt";
    let mut f = File::create(file_name)
        .expect(&format!("Cannot create {}", file_name));

    f.write("This is\n\na text\nfile".as_bytes()) 
        .expect(&format!("Cannot write to {}", file_name));

    let f = File::open(file_name)
        .expect(&format!("File {} not found", file_name));

    let file = BufReader::new(&f);

    for line in file.lines() {
        let str1: String = match line {
            Ok(str1) => str1.to_ascii_lowercase(),
            Err(_) => {                
                String::new() //return empty string
            }
        };
        println!("{}", &str1);
    }
}

```

## V (vlang)
```Go
import os

fn main() {
	file_name := "tmp0.txt"
	mut f1 := os.create(file_name) or {panic("cannot create $file_name")}
	to_write := ("This is\n\na text\nfile").bytes()
	f1.write(to_write) or {panic("cannot write $file_name")}
	f1.close()

	lines := os.read_lines(file_name) or {panic("cannot read $file_name")}
	println('$lines')
}
```