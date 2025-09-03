# Execution time

## C\#
```c#

// exe -> dotnet publish -c Release -r win10-x64 --self-contained true
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
            // list_sum
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


void main(List<String> arguments) {
  var stopwatch = Stopwatch();

  stopwatch.start(); //START MEASURE
  var perfects = classifyPerfect(20001);
  stopwatch.stop(); //END MEASURE

  var elapsed = stopwatch.elapsedMilliseconds;

  print('$perfects');
  print('Elapsed: $elapsed ms');
}

List<int> classifyPerfect(int nnum) {
  List<int> perfects = [];
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
  List<int> divisors = [];
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

## Julia
```julia
#import Pkg; Pkg.add("BenchmarkTools")
using BenchmarkTools

function find_proper_divisor(n)
    divisors = Int64[]
    endloop = n/2 + 1
    for i in 1:endloop
        if n%i == 0 
            append!(divisors, i)
        end            
    end
    return divisors
end

function classify_perfect(nnum)
    perfects = Int64[]
    for n in 2:nnum 
        divisors = find_proper_divisor(n)
        sum = 0
        for i in 1:lastindex(divisors)
            sum += divisors[i]
        end

        if sum == n 
            append!(perfects, n)
        end
    end
    return perfects
end

@btime perfects = classify_perfect(20001)
```

## Nim
```nim

# exe -> nim c -d:release  <filename>
import times as ts
import sequtils as sq

proc findProperDivisors(n: int32): seq[int32] =
    var divisors: seq[int32]
    let endloop: int32 = int32(n / 2)
    for i in 1..endloop:
        if (n mod i) == 0:
            divisors.add(i)
    divisors

proc classifyPerfects(num: int32): seq[int32] =
    var perfects: seq[int32]
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

echo perfects
echo endt - start
``` 

## Odin
```go

package main

import "core:fmt"
import "core:time"

main :: proc() {
	start := time.now() // START MEASURE
	perfects := classify_perfect(20001)
	duration := time.since(start) // END MEASURE

	fmt.println("\n", perfects)
	fmt.println("\nElapsed: ", duration)

	delete(perfects)
}

classify_perfect :: proc(nnum: int) -> [dynamic]int {
	perfects := [dynamic]int{}
	for n in 1 ..< nnum {
		divisors := find_proper_divisor(n)
		defer delete(divisors)
		sum := 0
		for d in divisors {
			sum += d
		}
		if sum == n {
			append(&perfects, n)
		}
	}
	return perfects
}

find_proper_divisor :: proc(n: int) -> [dynamic]int {
	divisors := [dynamic]int{}
	endloop := n / 2 + 1
	for i in 1 ..< endloop {
		if n % i == 0 {
			append(&divisors, i)
		}
	}
	return divisors
}
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
        # list_sum
        sumd = sum(divisors)
        if sumd == n:
            perfects += [n]
    return perfects

start_time: float = time.time() # START MEASURE
perfects = classify_perfects(20001)
end_time: float = time.time() # END MEASURE

for item in perfects:
    print(f"{item}")
print(f"Elapsed: {((end_time - start_time)*1000)} ms")
```

## Rust
```rust

//exe -> cargo build --release
use std::time::{Instant};

fn main() {
    let now = Instant::now(); //START MEASURE
    let perfects = classify_perfect(20001);
    let new_now = Instant::now();  //END MEASURE

    println!("{:?}", perfects);
    println!("Elapsed: {:?}", new_now.duration_since(now));

}

fn classify_perfect(num: i32) -> Vec<i32> {
    let mut perfects = vec![];
    for n in 1..num {
        let divisors = find_proper_divisors(n);

        // list_sum
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

## Sing
```rust
requires "sio";
requires "sys";

public fn singmain(argv [*]string) i32
{

    let now = sys.clock(); //START MEASURE
    let perfects = classify_perfect(20001);
    let  new_now = sys.clock();  //END MEASURE
    let diff = sys.clocksDiff(now, new_now); //microseconds

    sio.print("\n\r");
    if (perfects != null) {
        for (i in 0:perfects.size()) {
            sio.print(string((*perfects)[i]) + ", ");
        }
    }
    sio.print("\n\rElapsed: " + string(diff) + " us");

    return(0);
}

fn classify_perfect(num i32)  *[*]i32 {
    var perfects [*]i32;
    for (n in 1:num) {
        let divisors = find_proper_divisors(n);

        // list_sum
        //      mandatory pointer check
        if (divisors != null) {
            var sum = 0;
            for (j in 0:divisors.size()) {
                sum = sum + (*divisors)[j]; 
            }
            if (sum == n) {
                perfects.push_back(n);
            }
        }
    }
    return (&perfects);
}

fn find_proper_divisors(n i32) *[*]i32 {
    var divisors [*]i32;
    for (i in 1:((n / 2) + 1)) {
        if ((n % i) == 0) {
            divisors.push_back(i);
        }
    }
    return (&divisors);
}
```

## TypeScript
```typescript

console.time("Elapsed"); //START MEASURE
let perfects = classifyPerfect(20001);
console.timeEnd("Elapsed"); //END MEASURE
console.log(`${perfects}`);

function classifyPerfect(nnum: number) {
    let perfects = [];
    for (var n = 1; n < nnum; n++) {
        let divisors = findProperDivisor(n);
        var sum = 0;
        if (divisors.length > 0) {
            divisors.forEach(x => sum += x);
        }
        if (sum == n) {
            perfects.push(n);
        }
    }
    return perfects;
}

function findProperDivisor(n: number) {
    let divisors = [];
    let endloop = Math.floor(n / 2) + 1;
    for (let i = 1; i < endloop; i++) {
        if (n % i == 0) {
            divisors.push(i);
        }
    }
    return divisors;
}
```

## V (vlang)
```Go
// note: int seems to be a i32 also on a 64bit machine
// so used i64 instead of int
import time

fn main() {
    stopwatch := time.new_stopwatch() //START MEASURE
    perfects := classify_perfect(20001)
    duration := stopwatch.elapsed() //END MEASURE

    println("\n$perfects")
    println("\nElapsed: $duration")
}


fn classify_perfect(nnum i64) []i64 {
    mut perfects := []i64{}
    for n := 1; n < nnum; n++ {
        mut divisors := find_proper_divisor(n)
        mut sum := i64(0)
        for i := 0; i < divisors.len; i++ {
            sum += divisors[i]
        }

        if sum == n {
            perfects << n
        }
    }
    return perfects
}

fn find_proper_divisor(n i64) []i64 {
    mut divisors := []i64{}
    endloop := i64(n/2) + 1
    for i := 1; i < endloop; i++ {
        if n%i == 0 {
            divisors << i
        }
    }
    return divisors
}
```