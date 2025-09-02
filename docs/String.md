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
//  sprintf: ^7.0.0

import 'package:sprintf/sprintf.dart';

void main(List<String> arguments) {
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

## Go
```go
package main

import (
	"fmt"
	"strings"
	"time"
)

func main() {
	name := "John"
	age := 21
	date := time.Now()

	// String interpolation
	str1 := fmt.Sprintf("%s age is %d, weekday is %s, %d:%d\n",
		name, age, date.Weekday(), date.Hour(), date.Minute())
	fmt.Print(str1)

	str2 := fmt.Sprintf("four decimals %.4f, hex for %d: 0x%x \n", 1.23456, 16, 16)
	fmt.Print(str2)

   	//extract nth character
	chn2 := str2[2]
	fmt.Printf("char: %c\n", chn2)

	//substring
	subs := str2[0:3]
	fmt.Println("subs: ", subs)

	elems := strings.Split(str2, " ")
	var num float64
	for _, item := range elems {
		item = strings.Trim(item, ",:")
		_, err := fmt.Sscanf(item, "%f", &num)
		if err == nil {
			fmt.Printf("Found float %f in \"%s\"\n", num, item)
		}
	}
}
```

## Julia
```julia
using Printf
using Dates

name = "john"
age = 21
t = Dates.now()

# string interpolation
println("$(name) age is $(age), weekday is $(Dates.dayname(t)), $(Dates.hour(t)):$(Dates.minute(t))\n")

str2 = @sprintf "four decimals %.4f, hex for %d: 0x%x \n" 1.23456 16 16
println(str2)

# extract nth character
chn2 = str2[2]
@printf "char: %c\n" chn2

# substring
subs = str2[1:2]
@printf "subs %s\n" subs

elems = split(str2," ")
for el in elems
    el = strip(el, [',', ':'])   
    try
        num = parse(Float64, el)
        @printf "found float %s in \"%s\"\n" num el      
    catch
    end
end
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

# Eliminate ',', ':'
elems =  map(elems, proc (x: string): string = x.replace(",",""))
elems =  map(elems, proc (x: string): string = x.replace(":",""))

# Parse string for numbers
for item in elems:
    try:
        let num = parseFloat(item)
        echo &"Found float {num} in \"{item}\""
    except:
        discard
```

## Python
```python

import datetime

name = "John"
age = 21
date = datetime.datetime.now()

# String interpolation
str1 = f"{name } age is {age}, today is {date.day}, {date.hour}:{date.minute}"
print(str1)

#  String formatting
str1 = "{} age is {}, today us {}, {}:{}".format(name, age, date.day, date.hour, date.minute)
print(str1)

# float, hexadecimal
str2 = "four decimals: {:.4f}, hex for {}: 0x{:x}".format(0.123456, 16, 16)
print(str2)

# parse string for numbers
elems = str2.split(" ")
for item in elems:
    item = item.replace(",", "")
    item = item.replace(":", "")
    try:
        num = float(item)
        print(f"Found {num} in \"{item}\"")
    except:
        pass
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

    //extract nth character
    let mut chn2 = str2.chars().nth(2).unwrap();
    println!("char: {}", chn2);
    //alternative
    let chn2 = &str2[2..3];
    println!("char: {}", chn2);

    //substring
    let subs = &str2[0..3];
    println!("subs: {}", subs);

    // Parse string for numbers
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

## TypeScript
``` typescript

let name1 = "John";
let age = 21;
let date = new Date();

// String interpolation (use backtick)
let str1 = `${name1} age is ${age}, today is ${date.getDay()}, ${date.getHours()}:${date.getMinutes()}`;
console.log(str1);

let num = 16
let str2 = `four decimals: ${1.23456.toFixed(4)}, hex for ${num} is 0x${num.toString(16)}`;
console.log(str2);

// Parse string for number
let elems = str2.split(" ");
elems.forEach(item => {
    let num = parseFloat(item);
    if (!isNaN(num)) {
        console.log(`Found float ${num} in \"${item}\"`);
    }
});
```
