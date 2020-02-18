# Android

## Rust
### Compile for Android
- rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
- cargo install cargo-ndk
- cargo ndk --target aarch64-linux-android --android-platform 21 -- build --release
```
