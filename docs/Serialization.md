# Serialization


## Python
```python

import pickle

PICKLE_FILE_PATH = "tmp01"
map_dump = {"first": [1, 2, 3, 4], "second": [10, 20, 30, 40]}
fd1 = open(PICKLE_FILE_PATH, 'wb')
# save map
pickle.dump(map_dump, fd1)
fd1.close()

# recover map
map_load = {}
fd2 = open(PICKLE_FILE_PATH, 'rb')
map_load =  pickle.load(fd2)
fd2.close()
print(map_load)
```

## Rust
```rust

//[dependencies]
//serde = "1.0.105"
//serde_derive = "1.0.105"
//bincode = "1.2.1"
use std::collections::HashMap;

use bincode::{deserialize, serialize};
use serde_derive::{Deserialize, Serialize};
use std::fs::{File, OpenOptions};
use std::io::prelude::*; //read/write

const FILE_SERIALIZE_PATH: &str = "tmp01";

// struct enveloping the map
#[derive(Clone, Debug, Deserialize, Serialize)]
struct SMap {
    map: HashMap<String, Vec<i32>>,
}

fn main() {
    let mut map: HashMap<String, Vec<i32>> = HashMap::new();
    //initialize HashMap
    map.insert("first".to_string(), vec![1, 2, 3, 4]);
    map.insert("second".to_string(), vec![10, 20, 30, 40]);
    let s_map = SMap { map: map };

    let mut fw_bin = match OpenOptions::new().write(true).open(FILE_SERIALIZE_PATH) {
        Ok(file) => file,
        Err(_) => match File::create(FILE_SERIALIZE_PATH) {
            Ok(file) => file,
            Err(_) => panic!("Cannot create LOG file"),
        },
    };
    let s_map_dump: Vec<u8> = serialize(&s_map).unwrap();
    fw_bin.write(&s_map_dump).unwrap();
    let mut fr_bin = match OpenOptions::new().read(true).open(FILE_SERIALIZE_PATH) {
        Ok(file) => file,
        Err(_) => panic!("Cannot open file to read"),
    };
    let mut s_map_load: Vec<u8> = vec![];
    fr_bin.read_to_end(&mut s_map_load).unwrap();
    let s_map_restored: SMap = deserialize(&s_map_load).unwrap();

    println!("{:?}", s_map_restored.map);
}
```