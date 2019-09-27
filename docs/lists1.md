
## C\# 
```c#

using System;
using System.Collections.Generic;

public class Program
{
    public static void Main(string[] args)
    {
        //new empty list
        var lst1 = new List<string>();

        //new initialized list
        var lst2 = new List<string> { "str20", "str21" };

        //append element
        lst1.Add("str10");

        //append list
        lst1.AddRange(lst2);

        //add head element
        lst1.Insert(0, "str00");

        //reverse
        lst1.Reverse();

        //sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
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

package main

import (
	"fmt"
	"sort"
	"strings"
)

func main() {

    //new empty list
    lst1 := stringList{}
    
    //new initialized list
	lst2 := stringList{"str20", "str21"}

	//append element
	lst1 = append(lst1, "str10")

	//append list
	lst1 = append(lst1, lst2...)

	//add head element
	lst1 = append([]string{"str00"}, lst1...)

	//reverse
	sort.Sort(sort.Reverse(lst1))

	//sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
	//list length
	lst3 := lst1[1:len(lst1)]

	fmt.Printf("\n%v", lst3)

	//map and filter
	lst4 := stringList{}
	for _, elem := range lst1 {
		lst4 = append(lst4, strings.ToUpper(elem))
	}
	lst5 := stringList{}
	for _, elem := range lst4 {
		if elem != "STR00" {
			lst5 = append(lst5, elem)
		}
	}

	fmt.Printf("\n%v", lst5)
}

type stringList []string

func (p stringList) Len() int           { return len(p) }
func (p stringList) Less(i, j int) bool { return p[i] < p[j] }
func (p stringList) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }
```

## Nim
```nim

import sequtils as sq
import algorithm as al
import strutils as st

# new empty list
var lst1: seq[string] = @[]

# new initialized list
var lst2 = @["str20", "str21"]

# append element
lst1.add("str10")

#append list
lst1 = sq.concat(lst1, lst2)

# add head element
lst1 = sq.concat(@["str00"], lst1)

# reverse
lst1 = al.reversed(lst1)

# sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
# list length
var lst3 = lst1[1 .. len(lst1) - 1]
echo lst3

# map and filter
var lst4 = map(lst3, proc (x: string): string = st.toUpper(x))
var lst5 = filter(lst4, proc (x: string): bool = x != "STR00")
echo lst5
```

## Python
```python

from typing import List

# new empty list
lst1: List[str] = []

# new initialized list
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