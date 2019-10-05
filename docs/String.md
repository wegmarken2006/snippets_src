# String

## C\#
```c#

using System;

class Program
{
    static void Main(string[] args)
    {
        var name = "John";
        var age = 21;
        var date = DateTime.Now;

        // String interpolation:
        var str1 = $"{name} age is {age}, today is {date.DayOfWeek}, {date:HH:mm} now.";
        Console.WriteLine(str1);

        // String formatting:
        Console.WriteLine("{0} age is {1}, today is {2}, {3:HH:mm} now.",
            name, age, date.DayOfWeek, date);

        // float, hexadecimal
        var str2 = String.Format("four decimals: {0:0.0000}, hex for {1}: 0x{2:X}", 0.123456, 16, 16);
        Console.WriteLine(str2);

        // Parse numbers in string
        var elems = str2.Split(" ");
        char[] toTrim = { ':', ',' };

        foreach (var item in elems)
        {
            try
            {
                var num = Double.Parse(item.Trim(toTrim));
                Console.WriteLine("Found float {0} in \"{1}\"", num, item);
            }
            catch (FormatException e)
            {
            }
        }
    }
}
```

## Dart
```dart

// dependencies:
//  sprintf: ^4.0.2

import 'package:sprintf/sprintf.dart';

main(List<String> arguments) {
  var name = "John";
  var age = 21;
  var date = DateTime.now();
  var day = date.weekday;

  // String interpolation
  var str1 = "$name age is $age, weekday is $day, ${date.hour}:${date.minute}";
  print(str1);

  // String formatting float hex
  var str2 = sprintf("\nfour decimals: %.4f, hex for %d: 0x%x", [0.123456, 16, 16]);
  print(str2);

  // Parse number in string

  // Eliminate ',', ':'
  str2 = str2.replaceAll(',', '');
  str2 = str2.replaceAll(':', '');
  
  var elems = str2.split(" ");
  for (var item in elems) {
    try {
      var num = double.parse(item);
      print(" Found float $num in \"$item\"");
    } catch (e) {
    }    
  }
}
```

## Nim
```nim
import strformat
import times
import strutils
import sequtils

let  name = "John";
let  age = 21;
let  date = now()

# String interpolation
let  str1 = &"{name} age is {age}, weekday is {date.weekday}, {date.hour}:{date.minute}"
echo str1

# String formatting
let str2 = &"four decimals: {0.123456:2.4f}, hex for {16}: 0x{16:X}"
echo str2

var elems = str2.split(" ")
elems =  map(elems, proc (x: string): string = x.replace(",",""))
elems =  map(elems, proc (x: string): string = x.replace(":",""))
for item in elems:
    try:
        let num = parseFloat(item)
        echo &"Found float {num} in \"{item}\""
    except:
        discard
```

## Rust
```rust
// [dependencies]
// chrono = "*"
use chrono::{Datelike, Timelike, Utc};

fn main() {
    let name = "John";
    let age = 21;
    let date = Utc::now();

    // STring formatting: string, int, date
    let str1 = &format!(
        "{} age is {} weekday is, {:?}, {:?}:{:?}",
        name,
        age,
        date.weekday(),
        date.hour(),
        date.minute()
    );
    println!("{}", str1);
    //float, hex
    let str2 = &format!("four decimals: {:.4}, hex for {}: 0x{:X}", 0.123456, 16, 16);
    println!("{}", str2);

    // Parse string for numers
    let elems: Vec<&str> = str2.split(" ").collect();

    // Eliminate ',', ':'
    let mut elems1: Vec<String> = elems.into_iter().map(|x| x.replace(",", "")).collect();
    elems1 = elems1.into_iter().map(|x| x.replace(":", "")).collect();
    for item in elems1 {
        match item.parse::<f64>() {
            Ok(num) => println!(" Found float {} in \"{}\"", num, item),
            Err(_) => {}
        }
    }
}
```