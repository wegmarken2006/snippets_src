## C\#

```c#
using System;
using System.Collections;
using System.Collections.Generic;

namespace hello
{
    class Program
    {
        static void Main(string[] args)
        {
            var word_list = new List<string> { "table", "chair", "table" };
            var words = new Hashtable();
            foreach (var item in word_list)
            {
                if (words.Contains(item))
                {
                    words[item] = (int)words[item] + 1;
                }
                else
                {
                    words.Add(item, 1);
                }
            }

            foreach (DictionaryEntry item in words)
            {
                Console.WriteLine("{0}, {1}", item.Key, item.Value);
            }
        }
    }
}
```

## Dart
```dart
main(List<String> arguments) {
  var word_list = ["table", "chair", "table" ];
  var words = {};
  for (var item in word_list) {
      if (words.containsKey(item)) {
        words[item] += 1;
      }
      else {
        words[item] = 1;
      }
  }
  print('$words');
}
```

## Rust
```rust
use std::collections::HashMap;

fn main() {
    //count words
    let word_list = vec!["table", "chair", "table"];
    let mut words: HashMap<String, usize> = HashMap::new();
    for item in word_list  {
        let count = words.entry((*item).to_string()).or_insert(0);
        *count += 1;
    }

    println!("{:?}", &words);
}
```