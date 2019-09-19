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