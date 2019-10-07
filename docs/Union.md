# Union

## Dart
```dart

// interface to represent union
class Composite {
  bool isComposite() {}
}

class Person implements Composite {
  String firstName;
  String secondName;
  Person([this.firstName = "John", this.secondName = "Doe"]);

  bool isComposite() {
    return true;
  }
}

class cInt implements Composite {
  int value;
  cInt(this.value);

  bool isComposite() {
    return true;
  }
}

main(List<String> args) {
  var p1 = Person();

  cType(p1);
  cType(cInt(12)); //int needs to be enveloped in cInt
}

cType(Composite c) {
  if (c is cInt) {
    //cast to the actual type
    var c1 = c as cInt;
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