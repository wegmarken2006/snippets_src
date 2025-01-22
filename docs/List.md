# List

## C\# 
```c#

using System;
using System.Collections.Generic;
using System.Linq;

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

        //access elem with out of bounds check
        var elem  = lst1.ElementAtOrDefault(100);
        Console.Write("Elem *{0}* ", elem);

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

main(List<String> arguments) {  
  // new empty list
  var lst1 = List<String>();  

  //new initialized list
  var lst2 = ["str20", "str21"];

  // append element
  lst1.add("str10");

  // append list
  lst1 = lst1 + lst2;

  // add head element
  lst1 = ["str00"] + lst1;

  //reverse
  lst1 = lst1.reversed.toList();

  //trap out of bounds access
  var elem = getElemAt(lst1, 100);
  print('Elem *$elem*');

  // sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
  // list length
  var lst3 = lst1.sublist(1, lst1.length);
  print('$lst3');

  // map and filter
  var lst4 = lst3.map((x) => x.toUpperCase());
  var lst5 = lst4.where((x) => x != "STR00");
  print('$lst5');
}

String getElemAt(List<String> lst, int index) {
  String elem;
  try {
    elem = lst[index];
  } catch (e) {
    elem = "";
  }
  return elem;
}
```

## Go
```go
package main

import (
	"fmt"
	"slices"
	"strings"
)

func main() {

	//new empty list
	lst1 := []string{}

	//new initialized list
	lst2 := []string{"str20", "str21"}

	//append element
	lst1 = append(lst1, "str10")

	//append list
	lst1 = append(lst1, lst2...)

	//add head element
	lst1 = append([]string{"str00"}, lst1...)

	//reverse
	slices.Reverse(lst1)

	//trap out of bounds access
	elem := getElemAt(lst1, 100)
	fmt.Printf("\nElem *%v*", elem)

	//sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
	//list length
	lst3 := lst1[1:]
	fmt.Printf("\n%v", lst3)

	//contains
	if slices.Contains(lst1, "str00") {
		//index of element
		ind := slices.Index(lst1, "str00")
		fmt.Printf("\nIndex %d", ind)
	}

	//map and filter
	var lst4 []string
	for _, elem := range lst1 {
		lst4 = append(lst4, strings.ToUpper(elem))
	}
	var lst5 []string
	for _, elem := range lst4 {
		if elem != "STR00" {
			lst5 = append(lst5, elem)
		}
	}
	fmt.Printf("\n%v\n", lst5)
}

func getElemAt(lst []string, index int) string {
	defer recoverList()
	elem := lst[index]
	return elem
}

func recoverList() {
	recover()
}

```

## Julia
```julia
# new empty list
lst1 = String[]

# new initialized list
lst2 = String["str20", "str21"]

# apppend element
push!(lst1, "str10")

# append list
append!(lst1, lst2)

# add head element
pushfirst!(lst1, "str00")

# reverse
lst1 = reverse(lst1)

# trap out of bounds access
local elem = String
try
    elem = lst1[100]
catch
    println("Out of bounds")
end

# sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
# list length
lst3 = lst1[2:length(lst1)]
println(lst3)

# map and filter
lst4 = map(x -> uppercase(x), lst1)
lst5 = filter(x -> x != "STR00", lst4)
println(lst5)
```

## Kotlin
```kotlin

fun main() {
    // new empty list
    var lst1 = mutableListOf<String>()
    
    //new initialized list
    var lst2 = mutableListOf("str20", "str21")
    
    // append element
    lst1.add("str10")
    
    // append list
    lst1.addAll(lst2)
    
    // add head element
    lst1.add(0, "str00")
    
    // reverse
    lst1.reverse()
    
    //access elem with out of bounds check
    val elem = lst1.elementAtOrNull(100)
    println("Elem ${elem}")
    
    // sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
    // list length
    val lst3 = lst1.subList(1, lst1.size)
                            
    println(lst3)
    
    //map and filter
    val lst4 = lst3.map{it -> it.toUpperCase()}
    val lst5 = lst4.filter{it -> !it.equals("STR00")}
    
    println(lst5)    
}
```

## Nim
```nim

import sequtils as sq
import algorithm as al
import strutils as st
import strformat

proc getElemAt(lst: seq[string], index: int): string =
    try:
        return lst[index]
    except :
        return ""
        
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

# trap out of bounds access
let elem = getElemAt(lst1, 100)
echo &"Elem *{elem}*" 

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
def elem_at_index(lst: List[str], index: int) -> str:
    try:
        return lst[index]
    except:
        return ""

# append list
lst1 = lst1 + lst2

# add head element
lst1 = ["str00"] + lst1

# reverse
lst1.reverse()

# trap outof bounds access
elem = elem_at_index(lst1, 100)
print(f"Elem *{elem}*")

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

fn main() {
    // new empty list
    let mut lst1: Vec<&str> = vec![];

    //new initialized list
    let lst2 = vec!["str20", "str21"];

    // append element
    lst1.push("str10");

    // append list
    lst1.extend(lst2);

    // add head element
    lst1.insert(0, "str00");

    //reverse
    lst1.reverse();

    //access elem with out of bounds check
    let elem = match lst1.get(100) {
        None => "not found",
        Some(x) => x
    };
    println!("Elem {}", elem);


    // sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
    // list length
    let lst3: Vec<&str> = lst1[1..lst1.len()].to_vec();

    println!("{:?}", &lst3);

    // map and filter
    let lst4: Vec<_> = lst3.into_iter().map(|x| x.to_uppercase()).collect();
    let lst5: Vec<_> = lst4.into_iter().filter(|x| *x != "STR00").collect();

    println!("{:?}", &lst5);
}

```

## Sing
```rust

requires "sio";
requires "str";

public fn singmain(argv [*]string) i32
{
    // new empty list
    var lst1 [*]string;

    // new initialize dlist
    var lst2 [*]string = {"str20", "str21"};

    // append element
    lst1.push_back("str10");

    // append list
    lst1.append(lst2);

    // add head element
    lst1.insert(0, 1, "str00"); 

    // reverse
    var rev [*]string;
    let l_size = lst1.size();
    for (i in 0:l_size) {
        rev.push_back(lst1[l_size -i -1]);
    }
    lst1 = rev;
    
    //access elem out of bounds
    let  elem = lst1[100];
    if (str.len(elem) == 0) {
        sio.print("\n\r Elem not found");
    }
    else {
        sio.print("\n\r" + elem);
    }

    // sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
    var lst3 = lst1;
    lst3.erase(0,1);
    
    for (elem2 in lst3) {
        sio.print("\n\r" + elem2);
    }

    //map and filter
    var lst4 [*]string;
    for (elem2 in lst1) {
        lst4.push_back(str.toupper(elem2));
    }
    var lst5 [*]string;
    for (elem2 in lst4) {
        if (elem2 != "STR00") {
            lst5.push_back(elem2);
        }
    }

    sio.print("\n\r");
    for (elem2 in lst5) {
        sio.print("\n\r" + elem2);
    }

    return(0);
}
```

## TypeScript
``` typescript

// new empty list
var lst1 = [];

//new initialized list
var lst2 = ["str20", "str21"];

// append element
lst1.push("str10");

// append list
lst1 = lst1.concat(lst2);

// add head element
lst1 = ["str00"].concat(lst1);

//reverse
lst1 = lst1.reverse();

// sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
// list length
var lst3 = lst1.slice(1, lst1.length);

console.log(`${lst3}`);

// map and filter
var lst4 = lst3.map((x) => x.toUpperCase());
var lst5 = lst4.filter((x) => x != "STR00");

console.log(`${lst5}`);
```

## V (vlang)
``` Go
fn main() {
	//new empty list
	mut lst1 := []string{}

	//new initialized list
	lst2 := ["str20", "str21"]

	//append element
	lst1  << "str10"
	
	//append list
	lst1 << lst2

	//add head element
	lst1.insert(0, "str00")

	//reverse
	lst1.reverse_in_place()

    //access elem with out of bounds check
	elem := lst1[100] or {"elem not found"}
	println('$elem')

	// sublist["str21", "str20", "str10", "str00"]->["str20", "str10", "str00"]
	lst3 := lst1[1..]
	println('$lst3')

	//map and filter
	lst4 := lst3.map(it.to_upper())
	lst5 := lst4.filter(it != "STR00")
	println('$lst5')
}
```
