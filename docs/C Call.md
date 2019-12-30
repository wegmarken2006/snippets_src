# C Call

## Dart
```dart

//Copy test_ffi.dll into the project root
import 'dart:ffi' as ffi;

typedef NativeDoubleFunction = ffi.Double Function(ffi.Double);
typedef NativeOpFunction = double Function(double);

main() {
  var dl = ffi.DynamicLibrary.open("test_ffi.dll");
  NativeOpFunction test_ffi = dl
    .lookup<ffi.NativeFunction<NativeDoubleFunction>>('mul_2')
    .asFunction();
  
  var res = test_ffi(3.0);
  print("$res");
}
```

## Python
```python

from ctypes import cdll, c_double

lib = cdll.LoadLibrary("test_ffi")
mul_2 = lib.mul_2
mul_2.restype = c_double
res = mul_2(c_double(3.0))

print(res)
```