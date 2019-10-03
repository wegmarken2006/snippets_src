# Structure or Class

## Dart
```dart

//file moda.dart -> package moda
class Person {  
   String firstName;  
   String secondName; 
   //Default/Optional parameters between []
   Person([this.firstName = "John", this.secondName = "Doe"]) ;
}

class Customer {
  Person person;
  //starting underscore: not visible outside package
  double _balance; 
  Customer(this.person, [this._balance = 0.0]);

  void addToBalance(double sum) {
    this._balance += sum;
  }

  double getBalance() {
    return this._balance;
  }
}
```
```dart
import 'moda.dart';

main(List<String> args) {
  var p1 = Person("Mark");
  var c1 = Customer(p1);
  c1.person = p1;

  //Method
  c1.addToBalance(100.0);
  c1.addToBalance(10.0);

  //Property
  var name = c1.person.firstName;
  var balance = c1.getBalance();

  print("New $name balance: $balance");
}
```

## Nim
```nim

# file moda.nim -> module moda
type
    Person* = ref object # asterisk for public
        firstName: string
        secondName: string

# getter
proc firstName*(person: Person): string = 
    person.firstName

proc newPerson*(fName: string = "John", sName: string = "Doe"): Person =
    Person(firstName: fName, secondName: sName)
    
type
    Customer* = ref object 
        person: Person
        balance: float64
# getter
proc person*(customer: Customer): Person =
    customer.person
# getter
proc balance*(customer: Customer): float64 =
    customer.balance

proc newCustomer*(p: Person, b: float64 = 0.0): Customer =
    Customer(person: p, balance: b)

# method
proc addToBalance*(c: Customer, sum: float64) = 
    c.balance = c.balance + sum

```
```nim

import moda
import strformat as sf

let p1: Person = moda.newPerson("Mark") #use default for secondName
var c1 = moda.newCustomer(p1) #use default for balance

# method
c1.addToBalance(100.0)
c1.addToBalance(10.0)

# property, reading only through getter
echo sf.fmt"New {c1.person.first_name} balance: {c1.balance}"

```


## Python
```python

from dataclasses import dataclass

@dataclass
class Person:
    first_name: str = "John"
    second_name: str = "Doe"

@dataclass
class Customer:
    person: Person
    # double initial underscore for private
    __balance: float = 0.0

    def add_to_balance(self, num: float):
        self.__balance += num

    def get_balance(self) -> float:
        return self.__balance

p1 = Person("Mark") # use default for second_name
c1 = Customer(p1) #use default for balance

# method
c1.add_to_balance(100.0)
c1.add_to_balance(10.0)
new_balance = c1.get_balance()

# property
print(f" New {c1.person.first_name} balance: {new_balance}")
```

## Rust
```rust

//private fields/methods are not visible outside the module
mod mod1 {
    #[derive(Debug)]
    pub struct Person {
        pub first_name: String,
        pub second_name: String,
    }

    #[derive(Debug)]
    pub struct Customer {
        pub person: Person,
        balance: f64,
    }

    //default accessible outside only if fields are all public
    impl Default for Person {
        fn default() -> Self {
            Person {
                first_name: "John".to_string(),
                second_name: "Doe".to_string(),
            }
        }
    }

    impl Customer {
        pub fn new() -> Self {
            Customer{person: Person{..Person::default()}, balance: 0.0 }
        }
        pub fn add_to_balance(&mut self, sum: f64) {
            self.balance += sum;
        }
        pub fn get_balance(&self) -> f64 {
            self.balance
        }
    }

}

use mod1::*;

fn main() {
    let mut c1 = Customer::new(); //use person and balance default
    c1.person.first_name = "Mark".to_string(); //change first_name
    
    println!("{:?}", &c1);

    //Method
    c1.add_to_balance(100.0);
    c1.add_to_balance(10.0);

    //Property
    println!("New {} balance: {} ", &c1.person.first_name, c1.get_balance());
}

```