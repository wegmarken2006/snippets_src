# TOML


## Rust
```rust

//[dependencies]
//toml = "0.5.8"
//serde = "1.0.125"
//serde_derive = "1.0.125"

use serde_derive::{Deserialize, Serialize};
use std::fs::File;
use std::io::prelude::*; //without this, no file write

const CONF_TOML_PATH: &str = "conf.toml";

#[derive(Clone, Debug, Deserialize, Serialize)]
struct TomlConfig {
    name: String,
    val: i32,
}

fn init_conf() -> TomlConfig {
    let file_found = match File::open(CONF_TOML_PATH) {
        Ok(_) => true,
        Err(_) => false,
    };

    if ! file_found {
        return TomlConfig{name: String::from("Joe"), val: 10};
    }

    let mut fs_conf = File::open(CONF_TOML_PATH).unwrap();
    let mut str1 = String::new();
    fs_conf.read_to_string(&mut str1).unwrap();

    let tconf: TomlConfig = toml::from_str(&str1).unwrap();

    tconf
}

fn main() {
    let mut conf = init_conf();
    conf.val = 20;
    let conf_str = toml::to_string(&conf).unwrap();
    let mut fs_conf = File::create(CONF_TOML_PATH).unwrap();
    fs_conf.write(&conf_str.as_bytes()).unwrap();
}

```