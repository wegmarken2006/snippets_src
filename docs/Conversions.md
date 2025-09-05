# Conversions

## Dart
```dart

import 'dart:convert';
import 'dart:typed_data';

void main() {
  // i32 <-> bytes
  var v1 = i32ToBytes(112);
  var i1 = bytesToI32(v1);
  print(i1);

  // str <-> bytes
  var v2 = strToBytes("113.45");
  var s2 = bytesToStr(v2);
  print(s2);

  // i32 <-> str
  var s3 = i32ToStr(114);
  var i3 = strToI32(s3);
  print(i3);

  // f32 <-> bytes
  var v4 = f32ToBytes(115.67);
  var f4 = bytesToF32(v4);
  print(f4);
}

// Converts int (i32) to bytes (big endian)
List<int> i32ToBytes(int num) {
  var b = ByteData(4);
  b.setInt32(0, num, Endian.big);
  return b.buffer.asUint8List();
}

// Converts bytes (big endian) to int (i32)
int bytesToI32(List<int> buf) {
  var b = ByteData.sublistView(Uint8List.fromList(buf));
  return b.getInt32(0, Endian.big);
}

// Converts float (f32) to bytes (big endian)
List<int> f32ToBytes(double num) {
  var b = ByteData(4);
  b.setFloat32(0, num, Endian.big);
  return b.buffer.asUint8List();
}

// Converts bytes (big endian) to float (f32)
double bytesToF32(List<int> buf) {
  var b = ByteData.sublistView(Uint8List.fromList(buf));
  return b.getFloat32(0, Endian.big);
}

// Converts String to bytes (UTF-8)
List<int> strToBytes(String str1) {
  return utf8.encode(str1);
}

// Converts bytes to String (UTF-8)
String bytesToStr(List<int> buf) {
  return utf8.decode(buf);
}

// Converts String to int (i32)
int strToI32(String str1) {
  return int.parse(str1);
}

// Converts int (i32) to String
String i32ToStr(int num) {
  return num.toString();
}
```

## Go
``` go
package main

import (
	"bytes"
	"encoding/binary"
	. "fmt"
)

func main() {
	b1 := i32_to_bytes(112)
	i1 := bytes_to_i32(b1)
	Println(i1)

	//string to bytes, bytes to string
	s2 := "113.45"
	b2 := []byte(s2)
	s2b := string(b2)
	Println(s2b)

	//int to string, string to int
	s3 := Sprintf("%d", 114)
	var i3 int32
	Sscanf(s3, "%d", &i3)
	Println(i3)

	b4 := f32_to_bytes(115.67)
	f4 := bytes_to_f32(b4)
	Println(f4)
}

func i32_to_bytes(num int32) []byte {
	b1 := new(bytes.Buffer)
	binary.Write(b1, binary.LittleEndian, uint32(num))
	return b1.Bytes()
}

func bytes_to_i32(b1 []byte) int32 {
	bb1 := bytes.NewBuffer(b1)
	var i1 int32
	binary.Read(bb1, binary.LittleEndian, &i1)
	return i1
}

func f32_to_bytes(num float32) []byte {
	b1 := new(bytes.Buffer)
	binary.Write(b1, binary.LittleEndian, float64(num))
	return b1.Bytes()
}

func bytes_to_f32(b1 []byte) float32 {
	bb1 := bytes.NewBuffer(b1)
	var f1 float64
	binary.Read(bb1, binary.LittleEndian, &f1)
	return float32(f1)
}
```

## Odin
```go

package main

import "core:fmt"
import "core:strconv"
import "core:c/libc"
import "core:strings"

main :: proc() {
	// int <-> bytes
	b1 := i128_to_bytes(112)
    i1 := bytes_to_i128(b1)
    fmt.println(i1)

	// str <-> bytes
	v2 := str_to_bytes("113.45")
	s2 := bytes_to_str(v2)
	fmt.println(s2)

	//int <-> string
    s3 := fmt.tprintf("%d", 114)
    i3: int
    libc.sscanf(strings.clone_to_cstring(s3), "%d", &i3)
    fmt.println(i3)
}

i128_to_bytes :: proc(num: i128) -> []u8 {
	buf: [16]u8 
	str := strconv.itoa(buf[:], int(num))
	out: []u8 //stack
	out = transmute([]u8)str
	out2: [dynamic]u8 //context.allocator
	for elem in out {
		append(&out2, elem)
	}
	return out2[:]
}

bytes_to_i128 :: proc(bs: []u8) -> i128 {
	return i128(strconv.atoi(string(bs)))
}

str_to_bytes :: proc(str: string) -> []u8 {
	return transmute([]u8)str
}

bytes_to_str :: proc(bs: []u8) -> string {
	return string(bs)
}
```

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