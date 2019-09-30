# Execution time

## C\#
```c#

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;


public class Program
{
    public static void Main(string[] args)
    {
        var timer = Stopwatch.StartNew(); //START MEASURE
        var perfects = classifyPerfects(20001);
        timer.Stop(); //END MEASURE

        Console.WriteLine("Perfects: {0}", perfects.Count);
        foreach (var item in perfects)
        {
            Console.Write("{0} ", item);
        }
        Console.WriteLine("\nElapsed: {0}ms", timer.ElapsedMilliseconds);
    }

    public static List<int> classifyPerfects(int num) {
        var perfects = new List<int>();
        for (int n = 1; n < num; n++) {
            var divisors = findProperDivisor(n);
            var sum = divisors.Sum();
            if (sum == n) {
                perfects.Add(n);
            }
        }
        return perfects;
    }

    public static List<int> findProperDivisor(int n) {
        var divisors = new List<int>();
        for (int i = 1; i < (n / 2) + 1; i++) {
            if (n % i == 0) {
                divisors.Add(i);
            }
        }
        return divisors;
    }
}
```

## Dart
```dart

main(List<String> arguments) {
  var stopwatch = Stopwatch();

  stopwatch.start(); //START MEASURE
  var perfects = classifyPerfect(20001);
  stopwatch.stop(); //END MEASURE

  var elapsed = stopwatch.elapsedMilliseconds;
  
  print('$perfects');
  print('Elapsed: $elapsed ms');
}

List<int> classifyPerfect(int nnum) {
  var perfects = List<int>();
  for (var n = 1; n < nnum; n++) {
    var divisors = findProperDivisor(n);
    var sum = 0;
    if (divisors.isNotEmpty) {
      sum = divisors.fold(0, (a, b) => a + b);
    }
    if (sum == n) {
      perfects.add(n);
    }
  }
  return perfects;
}

List<int> findProperDivisor(int n) {
  var divisors = List<int>();
  var endloop = n ~/ 2 + 1;
  for (var i = 1; i < endloop; i++) {
    if (n % i == 0) {
      divisors.add(i);
    }
  }
  return divisors;
}
```

## Go
```go

package main

import (
	"fmt"
	"time"
)

func main() {

	start := time.Now() //START MEASURE
	perfects := classifyPerfect(20001)
	duration := time.Since(start) //END MEASURE

	fmt.Printf("\n%v", perfects)
	fmt.Printf("\nElapsed: %v", duration)
}

func classifyPerfect(nnum int) []int {
	perfects := []int{}
	for n := 1; n < nnum; n++ {
		divisors := findProperDivisor(n)
		sum := 0
		for i := 0; i < len(divisors); i++ {
			sum += divisors[i]
		}

		if sum == n {
			perfects = append(perfects, n)
		}
	}
	return perfects
}

func findProperDivisor(n int) []int {
	divisors := []int{}
	endloop := int(n/2) + 1
	for i := 1; i < endloop; i++ {
		if n%i == 0 {
			divisors = append(divisors, i)
		}
	}
	return divisors
}
```

## Nim
```nim

# compile with: nim c -d:release  <filename>
import times as ts
import sequtils as sq

proc findProperDivisors(n: int): seq[int] =
    var divisors: seq[int]
    let endloop: int = int(n / 2)
    for i in 1..endloop:
        if (n mod i) == 0:
            divisors.add(i)
    divisors

proc classifyPerfects(num: int): seq[int] =
    var perfects: seq[int]
    for n in 1..num:
        let divisors = findProperDivisors(n)
        var sumd = 0
        if divisors.len > 0:
            sumd = divisors.foldl(a + b)
        if sumd == n:
            perfects.add(n)
    perfects

var start = ts.getTime() # START MEASURE
var perfects = classifyPerfects(20001)
var endt = ts.getTime() # END MEASURE

echo perfects.len
echo perfects
echo endt - start
``` 

## Python
```python

import time
from typing import List


def find_proper_divisors(n: int) -> List[int]:
    divisors: List[int] = []
    for i in range(1, int((n / 2) + 1)):
        if n % i == 0:
            divisors += [i]
    return divisors

def classify_perfects(num: int) -> List[int]:
    perfects: List[int] = []
    for n in range(1, num):
        divisors = find_proper_divisors(n)
        sumd = sum(divisors)
        if sumd == n:
            perfects += [n]
    return perfects

start_time: float = time.time() # START MEASURE
perfects = classify_perfects(20001)
end_time: float = time.time() # END MEASURE

print(f"Perfects: {len(perfects)}")
for item in perfects:
    print(f"{item}")
print(f"Elapsed: {((end_time - start_time)*1000)} ms")
```

## Rust
```rust

use std::time::{Instant};

fn main() {
    let now = Instant::now(); //START MEASURE
    let perfects = classify_perfect(20001);
    let new_now = Instant::now();  //END MEASURE

    //Output
    println!("Perfects: {:?}", perfects.len());
    println!("{:?}", perfects);

    println!("Elapsed: {:?}", new_now.duration_since(now));

}

fn classify_perfect(num: i32) -> Vec<i32> {
    let mut perfects = vec![];
    for n in 1..num {
        let divisors = find_proper_divisors(n);

        let sum: i32 = divisors.iter().sum();
        if sum == n {
            perfects.push(n);
        }
    }
    perfects
}

fn find_proper_divisors(n: i32) -> Vec<i32> {
    let mut divisors = vec![];
    for i in 1..((n / 2) + 1) {
        if n % i == 0 {
            divisors.push(i);
        }
    }
    return divisors;
}
```