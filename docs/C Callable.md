# C Callable

## Rust
```rust


//[lib]
//name = "test_ffi"
//crate-type = ["cdylib"] #dynamic library
use std::os::raw::c_double;
use std::os::raw::{c_uchar, c_int};
use std::slice;

#[no_mangle]
pub extern "C" fn mul_2(val: c_double) -> c_double {
    val * 2.0
}

#[no_mangle]
pub extern "C" fn inc_u8_vec(in_vec: *mut c_uchar, len: c_int) {
    assert!(!in_vec.is_null(), "Null pointer in function");

    let in_vec: &mut[c_uchar] = unsafe{slice::from_raw_parts_mut(in_vec, len as usize)};    

    for elem in in_vec {
        *elem = *elem + 1;
    }
} 
```