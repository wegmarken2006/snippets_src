# Share


## Rust
```rust

use mod1::*;
use mod2::*;
use std::sync::{Arc, Mutex};

mod mod1 {
    use crate::mod2::*;
    use std::thread;
    use std::{
        sync::{Arc, Mutex},
        thread::JoinHandle,
    };

    pub struct ST1 {
        pub count: i32,
        pub name: String,
    }

    pub fn mod1_init() -> ST1 {
        ST1 {
            count: 0,
            name: String::from("MOD1"),
        }
    }

    pub fn run_th1(st2: Arc<Mutex<ST2>>) -> JoinHandle<()> {
        thread::spawn(move || {
            thread::park();
            println!("Thread 1 started");

            let mut st2_a = st2.lock().unwrap();
            st2_a.count = st2_a.count + 2;
        })
    }
}

mod mod2 {
    use crate::mod1::*;
    use std::thread;
    use std::{
        sync::{Arc, Mutex},
        thread::JoinHandle,
    };

    pub struct ST2 {
        pub count: i32,
        pub name: String,
    }

    pub fn mod2_init() -> ST2 {
        ST2 {
            count: 0,
            name: String::from("MOD2"),
        }
    }

    pub fn run_th2(st1: Arc<Mutex<ST1>>) -> JoinHandle<()> {
        thread::spawn(move || {
            thread::park();
            println!("Thread 2 started");

            let mut st1_a = st1.lock().unwrap();
            st1_a.count = st1_a.count + 1;
        })
    }
}

fn main() {
    let st1 = mod1_init();
    let st1_a = Arc::new(Mutex::new(st1));
    let st1_a2 = st1_a.clone();

    let st2 = mod2_init();
    let st2_a = Arc::new(Mutex::new(st2));
    let st2_a2 = st2_a.clone();

    let th1 = run_th1(st2_a2);
    let th2 = run_th2(st1_a2);

    th1.thread().unpark();
    th2.thread().unpark();

    th1.join().unwrap();
    th2.join().unwrap();

    println!("{}", st1_a.clone().lock().unwrap().count);
    println!("{}", st2_a.clone().lock().unwrap().count);
}

```