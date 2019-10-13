# Numeric

## C\# 
```c#

//dotnet add package Microsoft.ML.Probabilistic
using System;
using Microsoft.ML.Probabilistic.Math;

public class Program
{
    public static void Main(string[] args)
    {
        double[,] x = {{1.0,2.0,3.0},{3.0,4.0,5.0},{0.0,5.0,6.0}};
        var a = new Matrix(x);
        var at = a.Transpose();
        var b = a*at;
        var dt = a.Determinant();
        //var i = a.Inverse(); not implemented yet
        Console.WriteLine("{0}", at);
        Console.WriteLine("{0}", b);
        Console.WriteLine("{0}", dt);
        //Console.WriteLine("{0}", i);
    }
}
```


## Python 
```python

import time
import numpy as np

start_time: float = time.time() # START MEASURE

a = np.array([[1.,2.,3.],[3.,4.,5.],[0.,5.,6.]]) 
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
print(amax0)
print(at)
print(b)
print(dt)
print(i)
print(f"Elapsed: {((end_time - start_time)*1000)} ms")
```

## Rust 
```rust

//[dependencies]
//peroxide = "0.18.1"

extern crate peroxide;
use peroxide::*;
use std::time::{Instant};

fn main() {
    let now = Instant::now(); //START MEASURE
    let a = py_matrix(vec![vec![1., 2., 3.], vec![3., 4., 5.], vec![ 0., 5., 6.]]);
    let am0 = a.mean();
    let as0 = a.sd();
    let mut amax0: Vec<f64> = vec![];
    let cols = a.row(0).len();
    for index in 0..cols {
        amax0.push(max(a.col(index)))
    }
    let at = &a.transpose();
    let b = &a * at;
    let dt = &a.det();
    let i = &a.inv().expect("inverse failed");
    let new_now = Instant::now();  //END MEASURE

    am0.print();
    as0.print();
    println!("{:?}", amax0);
    at.print();
    b.print();
    dt.print();
    i.print();
    println!("Elapsed: {:?}", new_now.duration_since(now)); 
}
```
