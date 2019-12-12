# For Enumerate

## C\#
```c#

using System;
using System.Linq;
using System.Collections.Generic;

public class Program
{
    public static void Main(string[] args)
    {
        var lst = new List<int>{10, 20, 30};

        foreach (var item in lst.Select((value, index) => new {index, value}))
        {
            Console.WriteLine("Index {0}, value {1}", item.index, item.value); 
        }
    }
}
```

## Dart
```dart

main() async {
  var lst = [10, 20, 30];
  var ilist = lst.asMap();
  ilist.forEach((index, value) =>
    print("Index $index, value $value")
  );
}
```

## Go
```go

package main

import (
	"fmt"
)

func main() {
	lst := []int{10, 20, 30}	
	for index, value := range(lst) {
		fmt.Printf("\nIndex %d, value %d", index, value)
	}
}
```

## Nim
```nim

import strformat

let lst = [10, 20, 30]

for index, value in lst:
  echo &"index {index} value {value}"
```

## Python
```python

lst = [10, 20, 30]

for index, value in enumerate(lst):
    print(f"Index {index}, value {value}")
```

## Rust
```rust

fn main() {
    let lst = vec![10, 20, 30];

    for (index, value) in lst.iter().enumerate() {
        println!("Index {}, value {}", index, value);
    }
}
```
