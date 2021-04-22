# Conversions


## Rust
```rust

use std::{str};

fn main() {
    let v1 = i32_to_bytes(112);
    let i1 = bytes_to_i32(&v1);
    println!("{}", i1);

    let v2 = str_to_bytes(&String::from("113.45"));
    let s2 = bytes_to_str(&v2);
    println!("{}", s2);

    let s3 = i32_to_str(114);
    let i3 = str_to_i32(&s3);
    println!("{}", i3);

    let v4 = f32_to_bytes(115.67);
    let f4 = bytes_to_f32(v4);
    println!("{:?}", f4);
}

fn i32_to_bytes(num: i32) -> Vec<u8> {
    let n1 = (num & 0xff) as u8;
    let n2 = ((num >> 8) & 0xff) as u8;
    let n3 = ((num >> 16) & 0xff) as u8;
    let n4 = ((num >> 24) & 0xff) as u8;
    vec![n4, n3, n2, n1]
}

fn bytes_to_i32(buf: &Vec<u8>) -> i32 {
    let n1: u32 = (buf[0] as u32) << 8;
    let n2: u32 = (buf[1] as u32) << 16;
    let n3: u32 = (buf[2] as u32) << 24;
    let num = buf[3] as u32 | n3 | n2 | n1;
    num as i32
}

fn f32_to_bytes(num: f32) -> [u8; 4] {
    num.to_be_bytes()
}

fn bytes_to_f32(buf: [u8; 4]) -> f32 {
    f32::from_be_bytes(buf)
}

fn str_to_bytes(str1: &String) -> Vec<u8> {
    let bb = str1.clone().into_bytes();
    bb
}

fn bytes_to_str(buf: &Vec<u8>) -> &str {
    str::from_utf8(buf).unwrap()
}

fn str_to_i32(str1: &String) -> i32 {
    str1.parse::<i32>().unwrap()
}

fn i32_to_str(num: i32) -> String {
    format!("{}", num)
}


```