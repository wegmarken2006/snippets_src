## C\# 
```c#

using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{
    public static void Main(string[] args)
    {
        var wordList = new List<string> { "glass", "table", "chair", "table" };
        //var words = new Hashtable();
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
  var wordList = ["glass", "table", "chair", "table"];
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
	wordList := []string{"table", "chair", "table", "glass"}
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

## Python
```python

from typing import Dict, List, Tuple

word_list: List[str] = ["table", "chair", "table", "glass"]
words: Dict[str, int] = {}
for item in word_list:
    try:
        words[item] += 1
    except:
        words[item] = 1
print(words)

# sort by descending value
words_l: List[Tuple[str, int]] = list(words.items())
words_l.sort(reverse=True)
print(words_l)
```

## Rust
```rust

use std::collections::HashMap;
use std::cmp::Reverse;

fn main() {
    //count words
    let word_list = vec!["table", "chair", "table", "glass"];
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