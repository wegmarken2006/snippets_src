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
        var str1 = $"{name} age is {age}, weekday is {date.DayOfWeek}, {date:HH:mm} now.";
        Console.WriteLine(str1);

        // String formatting:
        Console.WriteLine("{0} age is {1}, weekday is {2}, {3:HH:mm} now.", 
            name, age, date.DayOfWeek, date);  
    }
}
```

## Dart
```dart

main(List<String> arguments) {
  var name = "John";
  var age = 21;
  var date = DateTime.now();
  var day = date.weekday;
    
  // String interpolation
  var str1 = "$name age is $age, weekday is $day, ${date.hour}:${date.minute}";

  print(str1);
}
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

    // STring formatting
    let str1 = format!("{} age is {} weekday is, {:?}, {:?}:{:?}", 
        name, age, date.weekday(), date.hour(), date.minute());
    println!("{}", str1);
}
```