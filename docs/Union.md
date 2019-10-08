# Union

## C\#
```c#

using System;
using System.Collections.Generic;

public interface IComposite
{
    bool isComposite();
}

class Person : IComposite
{
    public string firstName;
    public string secondName;
    //constructor with default arguments
    public Person(string fname = "John", string sname = "Doe")
    {
        firstName = fname;
        secondName = sname;
    }
    bool IComposite.isComposite() { return true; }
}

public class CInt : IComposite
{
    bool IComposite.isComposite() { return true; }
    public int value;
    public CInt(int num)
    {
        value = num;
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var p1 = new Person();
        var c1 = new CInt(12);
        cType(p1);
        cType(c1); //int needs to be enveloped in CInt
    }

    public static void cType(IComposite c)
    {
        if (c is Person cp)
        {
            Console.Write("Person {0}\n", cp.firstName);
        }
        else if (c is CInt ci)
        {
            Console.Write("Number {0}\n", ci.value);
        }
    }
}
```

## Dart
```dart

// interface to represent union
class IComposite {
  bool isComposite() {return true;}
}

class Person implements IComposite {
  String firstName;
  String secondName;
  Person([this.firstName = "John", this.secondName = "Doe"]);

  bool isComposite() {
    return true;
  }
}

class CInt implements IComposite {
  int value;
  CInt(this.value);

  bool isComposite() {
    return true;
  }
}

main(List<String> args) {
  var p1 = Person();

  cType(p1);
  cType(CInt(12)); //int needs to be enveloped in CInt
}

cType(IComposite c) {
  if (c is CInt) {
    //cast to the actual type
    var c1 = c as CInt;
    var value = c1.value;
    print("Number $value");
  } else if (c is Person) {
    //cast to the actual type
    var p1 = c as Person;
    var name = p1.firstName;
    print("Person $name");
  }
}
```

## Go
```go
```

## Nim
```nim

import strformat

type
    Person = ref object
        firstName: string
        secondName: string

type
    CompositeKind = enum cPerson, cInt
    Composite = ref object
        case kind: CompositeKind
        of cInt: value: int
        of cPerson: person: Person

proc cType(c: Composite) =
    if c.kind == cPerson:
        echo &"Person {c.person.firstName}"
    if c.kind == cInt:
        echo &"Number {c.value}"

let p1 = Person(firstName: "John", secondName: "Doe")
let cp1 = Composite(kind: cPerson, person: p1)
let cnum = Composite(kind: cInt, value: 12)
cType(cp1)
cType(cnum)
```

## Python
```python

from dataclasses import dataclass
from typing import Union

@dataclass
class Person:
    first_name: str = "John"
    second_name: str = "Doe"

Composite = Union[Person, int]

def c_type(c: Composite):
    if type(c) == int:
        print(f"Number {c}")
    elif isinstance(c, Person):
        print(f"Person {c.first_name}")

p1 = Person()
c_type(p1)
c_type(12)
```

## Rust
```rust
```

## TypeScript
``` typescript

class Person  {
    firstName: string;
    secondName: string;
    constructor(fname: string = "John", sname: string = "Doe") {
        this.firstName = fname;
        this.secondName = sname;
    }
}

type Composite = number | Person;

function cType(c: Composite) {
    if (c instanceof Person) {
        // non primitive type, needs casting
        var person = (c as Person); //tsc gives error here but generated js works
        console.log(`Person ${person.firstName}`);
    }
    else if (typeof (c) == "number") {
        console.log(`Number ${c}`);
    }
}

let p1 = new Person();
cType(p1);
cType(12);

```