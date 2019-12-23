# C Call

## Dart
```dart
//WIP
import 'dart:ffi' as ffi;

typedef NativeDoubleFunction = ffi.Double Function(ffi.Double);
typedef NativeOpFunction = double Function(double);

main() {
  var dl = ffi.DynamicLibrary.open("C:\\Work\\RsProj\\ffi\\target\\release\\test_ffi.dll");
  NativeOpFunction test_ffi = dl
    .lookup<ffi.NativeFunction<NativeDoubleFunction>>('mul_2')
    .asFunction();
  
  var res = test_ffi(3.0);
  print("$res");
}
```