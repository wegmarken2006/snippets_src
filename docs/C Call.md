# C Call

## Dart
```dart

//Copy test_ffi.dll into the project root

//dependencies:
//  ffi: ^0.1.3
import 'dart:ffi' as ffi;
import 'package:ffi/ffi.dart';

import 'dart:typed_data';

typedef NativeDoubleFunction = ffi.Double Function(ffi.Double);
typedef NativeOpFunction = double Function(double);

typedef NativeFunction2 = ffi.Void Function(ffi.Pointer<ffi.Void>, ffi.Int32);
typedef NativeOpFunction2 = void Function(ffi.Pointer<ffi.Void>, int);

main() {
  var dl = ffi.DynamicLibrary.open("test_ffi.dll");
  NativeOpFunction test_ffi = dl
    .lookup<ffi.NativeFunction<NativeDoubleFunction>>('mul_2')
    .asFunction();
  
  var res = test_ffi(3.0);
  print('$res');

  NativeOpFunction2 test_ffi2 = dl
    .lookup<ffi.NativeFunction<NativeFunction2>>('inc_u8_vec')
    .asFunction();
  
  Uint8List a8 = Uint8List.fromList([1, 2, 3, 4]);
  print('$a8');  

  var pointer = allocate<ffi.Uint8>(count: a8.length);
  for(int i = 0; i < a8.length; i++){
    pointer[i] = a8[i];
  }
  final voidP = pointer.cast<ffi.Void>();

  test_ffi2(voidP, a8.length);
  for(int i = 0; i < a8.length; i++){
    a8[i] = pointer[i];
  }
  print('$a8');

  free(pointer); 
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