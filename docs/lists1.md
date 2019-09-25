
## C\# 
```c#

using System;
using System.Collections.Generic;

public class Program
{
    public static void Main(string[] args)
    {
        List<string> lst1 = new List<string>();
        var lst2 = new List<string> { "str20", "str21" };

        //append element
        lst1.Add("str10");

        //append list
        lst1.AddRange(lst2);

        //add head element
        lst1.Insert(0, "str00");

        //reverse
        lst1.Reverse();

        //sublist["str21", "str20", "str10", "str00"] -> ["str20", "str10", "str00"]
        //list length
        var lst3 = lst1.GetRange(1, lst1.Count - 1);

        Console.WriteLine();
        foreach (var item in lst3)
        {
            Console.Write("{0} ", item);
        }
                //map and filter
        var lst4 = lst1.Select((x) => x.ToUpper());
        var lst5 = lst4.Where((x) => x != "STR00");

        Console.WriteLine();
        foreach (var item in lst5)
        {
            Console.Write("{0} ", item);
        }
    }
}
```

## Dart
```dart

```

## Go
```go

```

## Python
```python

from typing import List

lst1: List[str] = []
lst2: List[str] = ["str20", "str21"]

# append element
lst1 = lst1 + ["str10"]

# append list
lst1 = lst1 + lst2

# add head element
lst1 = ["str00"] + lst1

# reverse
lst1.reverse()

# sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
# list length
lst3: List[str] = lst1[1:len(lst1)]
print(lst3)

# map and filter
lst4: List[str] = [elem for elem in map(lambda x: x.upper(), lst1)]
lst5 = [elem for elem in filter(lambda x: x != "STR00", lst4)]
print(lst5)
```

## Rust
```rust
```
