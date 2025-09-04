# C Call

## Dart
```dart

//Copy test_ffi.dll into the project root

//dependencies:
//  ffi: ^2.1.4
import 'dart:ffi';
import 'dart:typed_data';
import 'package:ffi/ffi.dart';

typedef NativeDoubleFunction = Double Function(Double);
typedef DartDoubleFunction = double Function(double);

typedef NativeIncFunction = Void Function(Pointer<Void>, Int32);
typedef DartIncFunction = void Function(Pointer<Void>, int);

void main() {
  final dylib = DynamicLibrary.open('test_ffi.dll');

  final mul2 = dylib
      .lookupFunction<NativeDoubleFunction, DartDoubleFunction>('mul_2');

  final result = mul2(3.0);
  print('Result of mul_2: $result');

  final incU8Vec = dylib
      .lookupFunction<NativeIncFunction, DartIncFunction>('inc_u8_vec');

  final data = Uint8List.fromList([1, 2, 3, 4]);
  print('Original data: $data');

  final pointer = calloc<Uint8>(data.length);
  pointer.asTypedList(data.length).setAll(0, data);

  incU8Vec(pointer.cast<Void>(), data.length);

  final updatedData = pointer.asTypedList(data.length);
  print('Updated data: $updatedData');

  calloc.free(pointer);
}
```

## Odin
```go

//copy test_ffi.dll, test_ffi.dll.lib

package main

import "core:fmt"

foreign import test_ffi "test_ffi.dll.lib"

foreign test_ffi {
	mul_2 :: proc "c" (f64) -> f64 ---
	inc_u8_vec :: proc "c" (^[]int, int) ---
}

main :: proc() {
	fmt.println(mul_2(3.0))
	in_vec := []int{1, 2, 3, 4}
	fmt.println(in_vec)
	inc_u8_vec(&in_vec, 4)
	fmt.println(in_vec)
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