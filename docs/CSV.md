# CSV


# Dart
```dart

//dependencies:
//  csv: ^4.0.3

import 'package:csv/csv.dart';
import 'dart:io';
import 'dart:convert';

main() async {
  const CVS_PATH = 'tmp001.csv' ;
  
  var llWrite = [['FirstName', 'SecondName'], ['John', 'Doe'], ['Mark', 'Smith']];
  String csv = const ListToCsvConverter(fieldDelimiter: '\t').convert(llWrite);

  var f = File(CVS_PATH);
  var sink = f.openWrite();
  sink.write(csv);
  await sink.close();

  var input = File(CVS_PATH).openRead();
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
		fmt.Println(record)
	}
}
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
