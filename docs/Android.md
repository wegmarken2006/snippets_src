# Android

## Flutter
### Use dynamic libraries (i.e. Rust generated) in Flutter plugin
```
flutter create --template=plugin native_add
cd native_add
mkdir example\android\app\src\main\jniLibs\x86_64
mkdir example\android\app\src\main\jniLibs\x86
mkdir example\android\app\src\main\jniLibs\arm64-v8a
mkdir example\android\app\src\main\jniLibs\armeabi-v7a

copy <dyn lib project>\target\x86_64-linux-android\release\libxxx.so example\android\app\src\main\jniLibs\x86_64
copy <dyn lib project>\target\i686-linux-android\release\libxxx.so example\android\app\src\main\jniLibs\x86
copy <dyn lib project>\target\aarch64-linux-android\release\libxxx.so example\android\app\src\main\jniLibs\arm64-v8a
copy <dyn lib project>\target\armv7-linux-androideabi\release\libxxx.so example\android\app\src\main\jniLibs\armeabi-v7a

cd example
flutter run
```

## Rust
### Compile for Android
```
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
cargo install cargo-ndk
cargo ndk --target aarch64-linux-android --android-platform 21 -- build --release
cargo ndk --target armv7-linux-androideabi --android-platform 21 -- build --release
cargo ndk --target i686-linux-android --android-platform 21 -- build --release
cargo ndk --target x86_64-linux-android --android-platform 21 -- build --release
```

