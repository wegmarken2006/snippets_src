# Numeric

## C\# 
```c#

//dotnet add package MathNet.Numerics

using System;
using System.Collections.Generic;
using MathNet.Numerics.Statistics;
using MathNet.Numerics.LinearAlgebra.Double;
using System.Diagnostics;

public class Program
{
    public static void Main(string[] args)
    {
        var timer = Stopwatch.StartNew(); //START MEASURE
        double[,] x = { { 1.0, 2.0, 3.0 }, { 3.0, 4.0, 5.0 }, { 0.0, 5.0, 6.0 } };
        var a = DenseMatrix.OfArray(x);
        var at = a.Transpose();
        var i = a.Inverse();
        var v = a.ToColumnArrays();
        //columns mean
        var am0 = new List<double>();
        //columns standard deviation
        var as0 = new List<double>();
        //columns max
        var amax0 = new List<double>();
        foreach (var item in v)
        {
            var stats = new DescriptiveStatistics(item);
            am0.Add(stats.Mean);
            as0.Add(stats.StandardDeviation);
            amax0.Add(stats.Maximum);
        }
        var b = a * at;
        var dt = a.Determinant();
        timer.Stop(); //END MEASURE

        am0.ForEach((x) => Console.Write("{0} ", x));
        Console.WriteLine("");
        as0.ForEach((x) => Console.Write("{0} ", x));
        Console.WriteLine("");
        amax0.ForEach((x) => Console.Write("{0} ", x));
        Console.WriteLine("");
        Console.WriteLine("{0} ", at);
        Console.WriteLine("{0} ", b);
        Console.WriteLine("{0} ", dt);
        Console.WriteLine("{0} ", i);
        Console.WriteLine("\nElapsed: {0}ms", timer.ElapsedMilliseconds);
    }
}
```

## Go
```go

//go get -u -t gonum.org/v1/gonum/...

package main

import (
	"fmt"
	"time"

	"gonum.org/v1/gonum/mat"
	"gonum.org/v1/gonum/stat"
)

func main() {
	start := time.Now() //START MEASURE

	a := mat.NewDense(3, 3, []float64{1.0, 2.0, 3.0, 3.0, 4.0, 5.0, 0.0, 5.0, 6.0})
	rNum, _ := a.Dims()

	//columns mean
	am0 := []float64{}
	//columns standard deviation
	as0 := []float64{}
	//columns max
	amax0 := []float64{}

	weights := []float64{}
	for index := 0; index < rNum; index++ {
		weights = append(weights, 1.0)
	}
	for index := 0; index < rNum; index++ {
		var dst []float64
		col := mat.Col(dst, index, a)
		mean, std := stat.MeanStdDev(col, weights)
		am0 = append(am0, mean)
		as0 = append(as0, std)
		amax0 = append(amax0, f64Max(col))
	}

	at := a.T()
	var b mat.Dense // construct a new zero-value matrix
	b.Mul(a, at)
	dt := mat.Det(a)
	var i mat.Dense // construct a new zero-value matrix
	i.Inverse((a))

	duration := time.Since(start) //END MEASURE

	fmt.Printf("\n%v", am0)
	fmt.Printf("\n%v", as0)
	fmt.Printf("\n%v", amax0)
	fat := mat.Formatted(at, mat.Prefix(""), mat.Squeeze())
	fmt.Printf("\n%v\n", fat)
	fmt.Printf("\n%v", b)
	fmt.Printf("\n%v", dt)
	fmt.Printf("\n%v", i)
	fmt.Printf("\nElapsed: %v", duration)
}

func f64Max(v []float64) float64 {
	max := v[0]
	for index := 1; index < len(v); index++ {
		if v[index] > max {
			max = v[index]
		}
	}
	return max
}
```

## Julia
```julia
using Statistics
using LinearAlgebra
using Dates

tstart = Dates.now()
a = [1. 2. 3.;3. 4. 5.;0. 5. 6.]

# mean by columns
am0 = mean(a, dims=1)

# std dev by columns
as0 = std(a, corrected=false, dims=1)

# max by columns
amax0 = maximum(a, dims=1)

at = transpose(a)

# matrix multiplication
b = a * at

#determinant
dt = det(a)

#inverse
try
    i = inv(a)
catch    
end
tend = Dates.now()

println(am0)
println(as0)
println(amax0)
println(at)
println(b)
println(dt)
println(i)    
println(tend-tstart)
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

## Python 
```python

# pytorch
import time
import torch as pt

start_time: float = time.time() # START MEASURE

a = pt.Tensor([[1.,2.,3.],[3.,4.,5.],[0.,5.,6.]])
cols = a.size()[1] 
am0 = pt.Tensor()
as0 = pt.Tensor()
amax0 = pt.Tensor()
for ind in range(0, cols):
    ac = a[:, ind]
    am = ac.mean(dtype=pt.float).item()
    astd = ac.std().item()
    amax = ac.max().item()
    am0 = pt.cat((am0, pt.Tensor([am])))
    as0 = pt.cat((as0, pt.Tensor([astd])))
    amax0 = pt.cat((amax0, pt.Tensor([amax])))
at = a.t()
b = a.matmul(at)
dt = a.det().item()
i = a.inverse()

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
    //columns mean
    let am0 = a.mean();
    //columns standard deviation
    let as0 = a.sd();
    //columns max
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

## Rust 
```rust

//[dependencies]
//ndarray = "0.13.0"
//ndarray-linalg = { version = "0.12", features = ["intel-mkl"] }
use std::time::Instant;

extern crate ndarray;
extern crate ndarray_linalg;

use ndarray::*;
//use ndarray::prelude::*;
//use ndarray_linalg::cholesky::{DeterminantC, InverseC};
use ndarray_linalg::*;

pub trait VecStats {
    fn max(&self) -> f64;
}

impl VecStats for Array1<f64> {
    fn max(&self) -> f64 {
        let mut max_el = self[0];
        for elem in self {
            if *elem > max_el {
                max_el = *elem;
            }
        }
        max_el
    }
}

fn main() {
    let now = Instant::now(); //START MEASURE

    let a: Array2<f64> = array![[1., 2., 3.], [3., 4., 5.], [0., 5., 6.]];
    //let a = Array::from_shape_vec((3, 3), vec![1., 2., 3., 3., 4., 5., 0., 5., 6.]).unwrap();
    let am0 = a.mean_axis(Axis(0)).expect("Mean error");
    let as0 = a.std_axis(Axis(0), 1.);
    let mut amax0: Vec<f64> = vec![];
    let cols = a.ncols();
    for index in 0..cols {
        amax0.push(a.column(index).to_owned().max())
    }
    let at = a.t();
    let b = a.dot(&at);
    let i = a.inv().expect("Inversion error");
    let dt = a.det().expect("Determinant error");

    let new_now = Instant::now(); //END MEASURE

    println!("{}", am0);
    println!("{}", as0);
    println!("{:?}", &amax0);
    println!("{}", at);
    println!("{}", b);
    println!("{}", dt);
    println!("{}", i);
    println!("Elapsed: {:?}", new_now.duration_since(now));
}
```

## Rust 
```rust

//[dependencies]
//tch = "0.1.5"
use tch::{Tensor, Kind, IndexOp};
use std::time::{Instant};

fn main() {
    let now = Instant::now(); //START MEASURE

    let a = Tensor::of_slice(&[1., 2., 3., 3., 4., 5., 0., 5., 6.]).view([3, 3]);
    let mut am0_v: Vec<f64> = vec![];
    let mut as0_v: Vec<f64> = vec![];
    let mut amax0_v: Vec<f64> = vec![];

    let cols = a.size()[1];
    for ind in 0..cols {
        let ac = a.i((.., ind));
        let am = ac.mean(Kind::Double);
        let astd = ac.std(true);
        let amax = ac.max();
        am0_v.push(Vec::<f64>::from(am)[0]);
        as0_v.push(Vec::<f64>::from(astd)[0]);
        amax0_v.push(Vec::<f64>::from(amax)[0]);
        //am0 = Tensor::cat(&am0, &am);
    }
    let at = a.transpose(-2, 1);
    let b = a.matmul(&at);
    let dt = f64::from(a.det());
    let i = a.inverse();

    let new_now = Instant::now();  //END MEASURE

    println!("{:?}", am0_v);
    println!("{:?}", as0_v);
    println!("{:?}", amax0_v);
    at.print();
    b.print();
    println!("{}", dt);
    i.print();
    println!("Elapsed: {:?}", new_now.duration_since(now)); 
}
```
