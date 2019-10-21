# Cross Compilation

## C\#
```
dotnet publish -c Release -r linux-arm64 --self-contained true
```

## Go 
On windows:
```
set GOOS=linux
set GOARCH=arm64
go build
```

## Rust 
```
rustup target add mips-unknown-linux-gnu
rustup target add aarch64-linux-gnu-gcc 
```
On linux, edit .cargo/config:
```
[target.mips-unknown-linux-gnu]
linker = "mips-linux-gnu-gcc"
[target.aarch64-unknown-linux-gnu]
linker = "aarch64-linux-gnu-gcc"
```
To compile, run:
```
cargo build --target="aarch64-linux-gnu-gcc "
```