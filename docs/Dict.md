# Dictionary


## C\# 
```c#

using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{
    public static void Main(string[] args)
    {
        //count words

        var wordList = new List<string> { "glass", "table", "chair", "chair" };
        var words = new Dictionary<string, int>();
        foreach (var item in wordList)
        {
            if (words.ContainsKey(item))
            {
                words[item] = (int)words[item] + 1;
            }
            else
            {
                words.Add(item, 1);
            }
        }

        Console.WriteLine();
        foreach (var item in words)
        {
            Console.Write("{0}:{1} ", item.Key, item.Value);
        }

        Console.WriteLine();
        var sorted = words.OrderBy(x => -x.Value);
        foreach (var item in sorted)
        {
            Console.Write("{0}:{1} ", item.Key, item.Value);
        }
    }
}
```

## Dart
```dart

import 'dart:collection';

void main(List<String> arguments) {

  //count words

  var wordList = ["glass", "table", "chair", "chair"];
  var words = Map();
  for (var item in wordList) {
      if (words.containsKey(item)) {
        words[item] += 1;
      }
      else {
        words[item] = 1;
      }
  }
  print('$words');

  //sort values descending order
  var sorted = sortMap(words);
  print('$sorted');
}

LinkedHashMap sortMap(Map map) {
  var mapk = map.keys.toList();
  //sort keys according to values descending order
  mapk.sort((k1, k2) => map[k2].compareTo(map[k1]));
  var outMap = LinkedHashMap.fromIterable(mapk, key: (k) => k, value: (k) => map[k]);
  return(outMap);
}
```

## Go
```go

package main

import (
	"fmt"
	"sort"
)

func main() {
    //count words

	wordList := []string{"glass", "table", "chair", "chair"}
	words := make(map[string]int)

	for _, item := range wordList {
		words[item]++
	}
	fmt.Printf("\n%v", words)

	//sort by descending value
	keys := make([]string, 0, len(words))

	for key := range words {
		keys = append(keys, key)
	}
	sort.Slice(keys, func(i, j int) bool {
		return words[keys[i]] > words[keys[j]]
	})

	for i := 0; i < len(words); i++ {
		fmt.Println(keys[i], words[keys[i]])
	}
}
```

## Julia
```julia
wordList = String["glass", "table", "chair", "chair"]
words = Dict()

for word in wordList
    try
        words[word] += 1    
    catch
        words[word] = 1
    end    
end
println(words)

# sort by descending value
function mapSort(mapIn)
    ks = collect(keys(mapIn))
    vs = collect(values(mapIn))
    kv = Tuple{String,Int64}[]

    for ind in 1:lastindex(ks) 
        tup = (ks[ind], vs[ind])
        push!(kv, tup)        
    end
    kv = sort(kv, by = x -> x[2],  rev=true)
    return kv
end

println(mapSort(words))
```

## Nim
```nim

import tables
import algorithm as al


# count words

var wordList =  @["glass", "table", "chair", "chair"]
var words = initOrderedTable[string, int]()
for item in wordList:
  if words.hasKey(item):
    words[item] += 1
  else:
    words.add(item, 1)
  
echo words

# sort by descending value
words.sort(proc (x, y: (string, int)): int = x[1] - y[1], order = al.SortOrder.Descending)

echo words
```

## Odin
```go

#+feature dynamic-literals
package main

import "core:fmt"
import "core:slice"

main :: proc() {

    // count words
    word_list := []string{"glass", "table", "chair", "chair"}
    words := make(map[string]int)

    for item in word_list {
        words[item] += 1
    }
    fmt.println(words)

    // sort by descending value

	Words_struct :: struct {
		key: string,
		value: int
	}
	ws_arr: [dynamic]Words_struct

    for key in words {
		append(&ws_arr, Words_struct{key, words[key]})
    }

    slice.sort_by(ws_arr[:], proc(ws1: Words_struct, ws2: Words_struct) -> bool {
        return ws1.key > ws2.key
    })
	
    for i := 0; i < len(words); i += 1 {
        fmt.println(ws_arr[i].key, words[ws_arr[i].key])
    }
}
```

## Python
```python

from typing import Dict, List, Tuple
from operator import itemgetter

# count words

word_list: List[str] = ["glass", "table", "chair", "chair"]
words: Dict[str, int] = {}
for item in word_list:
    try:
        words[item] += 1
    except:
        words[item] = 1
print(words)

# sort by descending value
words_l: List[Tuple[str, int]] = list(words.items())
words_l = sorted(words_l, reverse=True, key=itemgetter(1))
print(words_l)
```

## Rust
```rust

use std::collections::HashMap;
use std::cmp::Reverse;

fn main() {
    //count words
    
    let word_list = vec!["glass", "table", "chair", "chair"];
    let mut words: HashMap<String, usize> = HashMap::new();
    for item in word_list  {
        let count = words.entry((*item).to_string()).or_insert(0);
        *count += 1;
    }

    //get specific key value
    let value = words.get("chair").expect("no key");

    println!("{:?} {:?}", &words, value);   

    //sort by descending value
    let mut words_v: Vec<_> = words.iter().collect();
    words_v.sort_by_key(|&(word, count)| (Reverse(count), word));
    println!("{:?}", &words_v);   
}
```

## Sing
```rust

requires "sio";
requires "sort";

public fn singmain(argv [*]string) i32
{
    //count words

    let word_list [*]string = {"glass", "chair","glass", "table", "chair", "chair"};
    var words map(string)i32;
    
    for (elem in word_list) {
        var value = words.get_safe(elem, -1);
        if (value == -1) {
            value = 1;
        }
        else {
            value = value + 1;
        }
        words.insert(elem, value);
    }
    //get specified value
    let value = words.get("chair");
    sio.print("\n\r chair: " + string(value));    

    //sort by descending value

    var sort_index [*]i32;
    var sort_keys [*]i32;
    var map_keys [*]string;
    sort.indexInit(sort_index, words.size());
    for (i in 0:words.size()) {
        map_keys.push_back(words.key_at(i));
        sort_keys.push_back(words.value_at(i));
    }
    sort.ksort_i32(sort_index, sort_keys);
    
    var rev_index [*]i32;     // reverse sort_index
    let i_size = sort_index.size();
    for (i in 0:i_size) {
        rev_index.push_back(sort_index[i_size -i -1]);
    }

    sio.print("\n\r");  
    for (i in rev_index) {
        sio.print("\n\r" + map_keys[i]);  
    }
    return(0);
}
```

## Typescript
```typescript

let wordList: string[] = [ "glass", "chair", "table", "chair"];
let words: Map<string, number> = new Map();
for (var item of wordList) {
    if (words.has(item) ) {
        words.set(item, words.get(item) + 1);
    }
    else {
        words.set(item, 1);
    }
}
console.log(words);

let sorted = new Map(Array.from(words.entries()).sort((a, b) => 
    {return (Array.from(a.values())[0] > Array.from(b.values())[0] ?  -1 : 1)}));

console.log(sorted);
```

## V (vlang)
```Go
fn main() {
    //count words

	word_list := ["glass", "table", "chair", "chair"]
    mut words := map[string]int{}

    for _, item in  word_list {
        words[item]++
    }
    print("\n$words")

    //sort by descending value
	map_sorted :=  map_sort(words)
    print("\n$map_sorted")
}

fn map_sort(map_in map[string]int) []KeyVal {
    //map to array
    mut map_s := []KeyVal{}
    for k, v in  map_in {
        map_s << KeyVal{k, v}
    }
	map_s.sort(a.val > b.val)
    return map_s
}

struct KeyVal {
    key string
    val int
}
```
