# For Range

## C\#
```c#

using System;

public class Program
{
    public static void Main(string[] args)
    {
        for (var idx = 0; idx < 10; idx ++)
        {
            Console.WriteLine("Index {0}", idx); 
        }
    }
}
```

## Dart
```dart

main() async {
  for (var idx = 0; idx < 10; idx++) {
    print("Index $idx");
  }
}
```

## Go
```go

package main

import (
	"fmt"
)

func main() {
	for idx := 0; idx < 10; idx++ {
		fmt.Printf("\nIndex %d", idx)
	}
}
```

## Nim
```nim

import strformat

# last number included
for idx in countup(0, 9, 1):
  echo &"Index {idx}"
```

## Python
```python

# last number excluded
for idx in range(0, 10, 1):
    print(f"Index {idx}")
```

## Rust
```rust

fn main() {
    //last number excluded
    for idx in (0..10).step_by(1) {
        println!("Index {}", idx);
    }
}
```
