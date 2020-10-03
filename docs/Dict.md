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

main(List<String> arguments) {

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
	fmt.Printf("\n%v", mapSort(words))
}

func mapSort(mapIn map[string]int) keyValList {
	//dict to slice
	mapS := keyValList{}
	for k, v := range mapIn {
		mapS = append(mapS, keyVal{k, v})
	}
	sort.Sort(sort.Reverse(mapS))
	return mapS
}

type keyVal struct {
	key string
	val int
}
type keyValList []keyVal

func (p keyValList) Len() int { return len(p) }
func (p keyValList) Less(i, j int) bool { return p[i].val < p[j].val }
func (p keyValList) Swap(i, j int){ p[i], p[j] = p[j], p[i] }
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