# CSV

## Dart
```dart

import 'package:csv/csv.dart';
import 'dart:io';
import 'dart:convert';

Future<void> main() async {
  const csvPath = 'tmp001.csv' ;

  var llWrite = [['FirstName', 'SecondName'], ['John', 'Doe'], ['Mark', 'Smith']];
  String csv = const ListToCsvConverter(fieldDelimiter: '\t').convert(llWrite);

  var f = File(csvPath);
  var sink = f.openWrite();
  sink.write(csv);
  await sink.close();

  var input = File(csvPath).openRead();
  var llRead = await input
    .transform(utf8.decoder)
    .transform(CsvToListConverter(fieldDelimiter: '\t'))
    .toList();

  for (var elem in llRead) {
    print('First: ${elem[0]}, Second: ${elem[1]}');
  }
}
```

## Go
```go

package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
)

func main() {
	records := [][]string{
		{"FirstName", "SecondName"},
		{"John", "Doe"}, {"Mark", "Smith"},
	}
	fileName := "tmp001.csv"
	file, err := os.Create(fileName)
	if err != nil {
		fmt.Printf("Can't create %s\n", fileName)
		os.Exit(0)
	}

	w := csv.NewWriter(file)
	w.WriteAll(records) // calls
	file.Close()

	file, err = os.Open(fileName)
	if err != nil {
		fmt.Printf("Can't open %s\n", fileName)
		os.Exit(0)
	}
	defer file.Close()

	r := csv.NewReader(file)

	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("Record reading error")
			os.Exit(0)
		}
		fmt.Printf("First: %s, Second: %s\n", record[0], record[1])
	}
}
```

## Julia
```julia
#import Pkg; Pkg.add("CSV"); Pkg.add("DataFrames")
using CSV, DataFrames

filename = "tmp001.csv"
touch(filename)
df = DataFrame(FirstName=["John", "Mark"], SecondName=["Doe", "Smith"])
CSV.write(filename, df)

csv_reader = CSV.File(filename)
for row in csv_reader
    println("First: $(row.FirstName), Second: $(row.SecondName)")
end
```

## Odin
```go

#+feature dynamic-literals
package main

import "core:encoding/csv"
import "core:fmt"
import "core:os"

main :: proc() {
	ll_words := [dynamic][]string{{"FirstName", "SecondName"}, {"John", "Doe"}, {"Mark", "Smith"}}
	defer delete(ll_words)

	file_name := "tmp001.csv"
	f, err := os.open(file_name, (os.O_CREATE | os.O_RDWR), 0o644)
	if err != nil {
		fmt.println(err)
	}

	w: csv.Writer
	csv.writer_init(&w, os.stream_from_handle(f))

	for str_vec in ll_words {
		csv.write(&w, str_vec)
	}
	os.close(f)

	fr, err2 := os.open(file_name, (os.O_RDWR), 0o644)
	if err2 != nil {
		fmt.println(err2)
	}
	defer os.close(fr)

	r: csv.Reader
	csv.reader_init(&r, os.stream_from_handle(fr))
	defer csv.reader_destroy(&r)
	records, _ := csv.read_all(&r)

	fmt.println(records)
}
```

## Python
```python

import csv

CSV_PATH = 'tmp001.csv'

with open(CSV_PATH, 'w', newline='') as csvfile:
    wr = csv.writer(csvfile, delimiter='\t')
    wr.writerow(['FirstName', 'SecondName'])
    wr.writerow(['John', 'Doe'])
    wr.writerow(['Mark', 'Smith'])

with open(CSV_PATH) as csvfile:
    rd = csv.reader(csvfile, delimiter='\t')
    for rw in rd:
        print(f"First: {rw[0]}, Second: {rw[1]}")
```

## Rust
```rust

//[dependencies]
//csv = "1.1.2"

use csv::{ReaderBuilder, WriterBuilder};

fn main() {
    const CSV_PATH: &str = "tmp001.csv";

    let mut wtr = WriterBuilder::new()
        .delimiter(b'\t')
        .quote_style(csv::QuoteStyle::NonNumeric)
        .from_path(CSV_PATH)
        .expect("Error opening");

    //write Header
    wtr.write_record(&["FirstName", "SecondName"])
        .expect("Error writing header");

    wtr.write_record(&["John", "Doe"])
        .expect("Error writing record");
    wtr.write_record(&["Mark", "Smith"])
        .expect("Error writing record");

    wtr.flush().expect("Error flushing");

    let mut rdr = ReaderBuilder::new()
        .delimiter(b'\t')
        .from_path(CSV_PATH)
        .expect("Error reading CSV");
    for result in rdr.records() {
        let record = result.expect("No record");
        let first: String = match record[0].parse() {
            Ok(st) => st,
            Err(_) => String::from(""),
        };
        let second: String = match record[1].parse() {
            Ok(st) => st,
            Err(_) => String::from(""),
        };
        println!("First: {}, Second: {}", first, second);
    }
}
```

## Rust (with serialization)
```rust
//[dependencies]
//csv = "1.1.2"
//serde = "1.0.125"
//serde_derive = "1.0.125"

use csv::{ReaderBuilder, WriterBuilder};
use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Record {
    FirstName: String,
    SecondName: String,
}
fn main() {
    const CSV_PATH: &str = "tmp001.csv";

    let mut wtr = WriterBuilder::new()
        .delimiter(b'\t')
        .quote_style(csv::QuoteStyle::NonNumeric)
        .from_path(CSV_PATH)
        .expect("Error opening");

    //write Header
    wtr.write_record(&["FirstName", "SecondName"])
        .expect("Error writing header");

    let rec1 = Record {
        FirstName: "John".to_string(),
        SecondName: "Doe".to_string(),
    };
    wtr.serialize(rec1).expect("Error writing record");
    let rec2 = Record {
        FirstName: "Mark".to_string(),
        SecondName: "Smith".to_string(),
    };
    wtr.serialize(rec2).expect("Error writing record");
    wtr.flush().expect("Error flushing");

    let mut rdr = ReaderBuilder::new()
        .delimiter(b'\t')
        .has_headers(true)
        .from_path(CSV_PATH)
        .expect("Error reading CSV");
    for result in rdr.deserialize() {
        let record: Record = result.expect("No record");

        println!("{:?}", record);
    }
}
```

## V (vlang)
``` Go
import encoding.csv
import os

fn main() {
	records := [["FirstName", "SecondName"], ["John", "Doe"], 
		["Mark", "Smith"]]	

	file_name := "tmp0.txt"
	mut f1 := os.create(file_name) or {panic("cannot create $file_name")}
	
	mut writer := csv.new_writer()
	for record in records {
		writer.write(record) or {}
		to_write := writer.str()
		f1.write(to_write.bytes()) or {panic("cannot write $file_name")}
	}
	f1.close()

	lines := os.read_lines(file_name) or {panic("cannot read $file_name")}

	for ind, line in lines {
		//skip header
		if ind == 0 {
			continue
		} 
		line_nl := "$line\n"
		mut parser := csv.new_reader(line_nl)
    	items := parser.read() or { break }
    	println("First: ${items[0]}, Second: ${items[1]}")
	}

}
```
