# Write & Read Lines


## Dart
```dart

import 'dart:io';
import 'dart:convert';

main() async {
  var fileName = "tmp01.txt";
  var f = File(fileName);
  var sink = f.openWrite();
  sink.write("This is\n\na text\nfile");
  await sink.close();

  var fRead = File(fileName);
  Stream<List<int>> inputStream = fRead.openRead();

  var lines = utf8.decoder.bind(inputStream).transform(LineSplitter());
  try {
    await for (var line in lines) {
      print('$line');
    }
  } catch (e) {
    print(e);
  }
}
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

## Rust
```rust

use std::fs::File;
use std::io::prelude::*; //without this, no write
use std::io::BufRead;
use std::io::BufReader;
fn main() {
    let file_name = "tmp01.txt";
    let mut f = match File::create(file_name) {
        Ok(file) => file,
        Err(_) => panic!("Cannot create {}", file_name),
    };
    match f.write("This is\n\na text\nfile".as_bytes()) {
        Ok(_) => {}
        Err(_) => panic!("Cannot write to {}", file_name),
    };

    let f = File::open(file_name)
        .expect(&format!("File {} not found", file_name));

    let file = BufReader::new(&f);

    for line in file.lines() {
        let str1: String = match line {
            Ok(str1) => str1.to_ascii_lowercase(),
            Err(_) => {
                //return empty string
                String::new()
            }
        };
        println!("{}", &str1);
    }
}
```