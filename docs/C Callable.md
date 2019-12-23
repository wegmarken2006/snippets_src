# C Callable

## Rust
```rust

//[lib]
//name = "test_ffi"
//crate-type = ["cdylib"] #dynamic library
use std::os::raw::c_double;

#[no_mangle]
pub extern "C" fn mul_2(val: c_double) -> c_double {
    val * 2.0
}
```