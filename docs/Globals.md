# Globals


## Rust
```rust

//[dependencies]
//lazy_static = "1.4.0"

use lazy_static::lazy_static;
use std::sync::Mutex;

#[derive(Debug, Clone)]
struct STRUCT1 {
    x: i32,
    s: String,
}

lazy_static! {
    // Global unmutable initialized safe
    static ref GLOBAL_S: STRUCT1 = STRUCT1 {
        x: 10,
        s: String::from("GLOBAL_S")
    };
    // Global mutable initialized safe
    static ref GLOBAL_S_M: Mutex<STRUCT1> = Mutex::new(STRUCT1 {
        x: 10,
        s: String::from("GLOBAL_S_M")
    });
}

//Global mutable inizialized unsafe
static mut GLOBAL_MUT: Vec<i32> = vec![];

//Global mutable uninizialized unsafe
static mut GLOBAL_MUT_UNINIT: Option<STRUCT1> = None;

fn main() {
    println!("{} {}", GLOBAL_S.x, GLOBAL_S.s);
    let mut sm = GLOBAL_S_M.lock().unwrap();
    println!("{} {}", sm.x, sm.s);
    sm.x = 11;
    println!("{} {}", sm.x, sm.s);
    //unlock
    std::mem::drop(sm);

    unsafe {
        GLOBAL_MUT.push(20);
    }

    unsafe {
        GLOBAL_MUT_UNINIT = Some(STRUCT1 {
            x: 30,
            s: String::from("GLOBAL_MUT_UNINIT"),
        });
    }

    unsafe {
        GLOBAL_MUT_UNINIT = Some(STRUCT1 {
            x: 30,
            s: String::from("GLOBAL_MUT_UNINIT"),
        });
    }

    unsafe {
        match GLOBAL_MUT_UNINIT {
            None => (),
            Some(ref mut st) => {
                st.x = 40;
            }
        }
    }

    fn1();
}

fn fn1() {
    unsafe {
        println!("Inside fn1 {}", GLOBAL_MUT[0]);
    }

    unsafe {
        let struct2 = match GLOBAL_MUT_UNINIT {
            None => panic!("error"),
            Some(ref mut s) => {
                s.x = 41;
                s
            }
        };
        println!("{:?}", struct2);
    }
}


```