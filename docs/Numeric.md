# Numeric

## C\# 
```c#
```


## Python 
```python

import time
import numpy as np

start_time: float = time.time() # START MEASURE

a = np.array([[1.,2.,3.],[3.,4.,5.],[4.,5.,6.]]) 
am0 = np.mean(a, axis = 0) 
as0 = np.std(a, axis = 0)
amax0 = np.max(a, 0)
at = np.transpose(a)
b = np.dot(a, at)
dt = np.linalg.det(a);
i = np.linalg.inv(a)

end_time: float = time.time() # END MEASURE

print(am0)
print(as0)
print(at)
print(b)
print(dt)
print(i)
print(f"Elapsed: {((end_time - start_time)*1000)} ms")
```

## Rust 
```rust
```
