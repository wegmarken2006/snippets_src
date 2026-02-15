# JSON

## Dart
```dart
import 'dart:io';
import 'dart:convert';

class Config {
  String descr;
  List<int> iList;
  List<String> sList;
  Config(this.descr, this.iList, this.sList);
  dynamic fromJson(Map<String, dynamic> json) {
    return Config(
      json['description'],
      List<int>.from(json['i_list']),
      List<String>.from(json['s_list']),
    );
  }

  static Map<String, dynamic> toJson(Config value) => {
    'description': value.descr,
    'i_list': value.iList,
    's_list': value.sList,
  };
}

void main() {
  var conf = Config("Description", [1, 2, 3, 4], ["AAA", "BBB", "CCC"]);
  var fileName = "tmp01.json";
  var f = File(fileName);
  var encodeMap = jsonEncode(
    conf,
    toEncodable: (Object? value) => value is Config
        ? Config.toJson(value)
        : throw UnsupportedError('Cannot convert to JSON: $value'),
  );
  f.writeAsString(encodeMap);

  Map<String, dynamic> data;
  f.readAsString().then((str1) {
    data = jsonDecode(str1);
    print('$data');
  });
}
```

## Odin
```go
package main

import "core:encoding/json"
import "core:fmt"
import "core:os"

Config :: struct {
    descr:  string,
    i_list: []int,
    s_list: []string,
}

main :: proc() {
    conf := Config{"Description", []int{1, 2, 3, 4}, []string{"AAA", "BBB", "CCC"}}

    file_name := "tmp001.json"
	  f, err := os.open(
		  file_name,
		  os.O_CREATE | os.O_RDWR | os.O_TRUNC,
		  os.Permissions_Read_Write_All,
	  )
    if err != nil {
        fmt.println(err)
    }

    if json_data, err := json.marshal(conf); err == nil {
        os.write(f, json_data)
    } else {
        fmt.println("Couldn't marshal struct!")
    }
    os.close(f)

    read_data, err2 := os.read_entire_file(file_name, context.allocator)
	if err2 == os.ERROR_NONE {
        conf2: Config
        if json.unmarshal(read_data[:], &conf2) == nil {
            fmt.println(conf2)
        } else {
            fmt.println("Error unmarshaling")
        }
    } else {
        fmt.println("Failed to read JSON file")
    }
}
```

## Rust
```rust
// serde =  { version = "1.0.143", features = ["derive"] }
// serde_json = "1.0.143"

use std::{
    fs::File,
    io::{Error, Read, Write},
};

#[derive(serde::Serialize, serde::Deserialize, Debug)]
struct Config {
    description: String,
    i_list: Vec<i32>,
    s_list: Vec<String>,
}

fn main() -> Result<(), Error> {
    // Create a Config instance
    let conf = Config {
        description: "Description".to_string(),
        i_list: vec![1, 2, 3, 4],
        s_list: vec!["AAA".to_string(), "BBB".to_string(), "CCC".to_string()],
    };

    // Serialize to JSON and write to file
    let json_str = serde_json::to_string_pretty(&conf)?;
    let file_name = "tmp01.json";
    let mut f = File::create(file_name)?;
    f.write(json_str.as_bytes())?;

    // Read JSON from file and deserialize
    let mut f = File::open(file_name)?;
    let mut contents = "".to_string();
    f.read_to_string(&mut contents)?;
    let decoded: Config = serde_json::from_str(&contents)?;

    // Print the deserialized struct
    println!("{:?}", decoded);

    Ok(())
}
```
