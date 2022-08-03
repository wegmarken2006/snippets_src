# TOML

## Go
```go
//go.mod
//require github.com/pelletier/go-toml v1.9.4
package main

import (
	. "fmt"
	"os"

	toml "github.com/pelletier/go-toml"
)

// all fields must be Public (Capitalized)!
type Person struct {
	Name string `toml:"name"`
	Val  int    `toml:"val"`
}

type TomlConfig struct {
	Person Person `toml:"person"`
}

const CONF_TOML_PATH = "conf.toml"

func main() {

	cfg := TomlConfig{Person{Name: "Joe", Val: 10}}
	Println(cfg)
	b, err := toml.Marshal(cfg)

	if err != nil {
		panic(err)
	}
	Println(string(b))
	file, err := os.Create(CONF_TOML_PATH)
	if err != nil {
		panic(err)
	}
	file.Write(b)
	file.Close()

	var cfg2 TomlConfig
	b2, err := os.ReadFile(CONF_TOML_PATH)
	err = toml.Unmarshal(b2, &cfg2)
	if err != nil {
		panic(err)
	}
	Println(cfg2)
}
```

## Julia
```julia
using TOML

struct Person
    name::String
    val::Int64
end
const CONF_TOML_PATH = "conf.toml"

# form struct to TOML
p = Person("Joe", 10)

function struct_to_dict(s)
    return Dict(key => getfield(s, key) for key in propertynames(s))
end

p_dict = Dict("Person" => struct_to_dict(p))
open(CONF_TOML_PATH, "w") do io
    TOML.print(io, p_dict)
end

# from TOML ro struct
parsed = TOML.parsefile(CONF_TOML_PATH)

function dict_to_person(d)
    local p = Person(d["Person"]["name"], d["Person"]["val"])
end

println(dict_to_person(parsed))
```

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