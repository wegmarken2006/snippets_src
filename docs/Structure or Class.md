# Structure or Class

## C\#
```c#

using System;

class Person
{
    public string firstName;
    public string secondName;
    //constructor with default arguments
    public Person(string fname = "John", string sname = "Doe")
    {
        firstName = fname;
        secondName = sname;
    }

}

class Customer
{
    public Person person;
    //keep  balance private
    double balance = 0.0;

    public Customer(Person p)
    {
        person = p;
    }
    //methods
    public void AddToBalance(double sum)
    {
        balance += sum;
    }
    public double GetBalance()
    {
        return balance;
    }
}
class Program
{
    static void Main(string[] args)
    {
        var p1 = new Person("Mark");
        var c1 = new Customer(p1);

        //methos
        c1.AddToBalance(100.0);
        c1.AddToBalance(10.0);

        //property
        Console.WriteLine("New {0} balance: {1}", c1.person.firstName, c1.GetBalance());
    }
}
```

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
## Go
```go

//file src/moda/moda.go -> package moda
package moda

// all public identifier must start with Uppercase

type Person struct {
	FirstName  string
	SecondName string
}

type Customer struct {
	Person  Person
	balance float64 //lowercase because private
}

// struct creation with optional parameters
func NewPerson(args ...string) Person {
	firstName := "John"
	secondName := "Doe"
	if len(args) > 0 {
		firstName = args[0]
	}
	if len(args) > 1 {
		secondName = args[1]
	}
	return Person{FirstName: firstName, SecondName: secondName}
}

// struct creation
func NewCustomer(person Person) Customer {
	return Customer{Person: person, balance: 0.0}
}

// public methods for Customer
func (customer *Customer) AddToBalance(sum float64) {
	customer.balance += sum
}
func (customer *Customer) GetBalance() float64 {
	return customer.balance
}
```
```go

package main

import (
	"fmt"
	"moda"
)

func main() {	
	p1 := moda.NewPerson("Mark")
	c1 := moda.NewCustomer(p1)

	//method
	c1.AddToBalance(100.0)
	c1.AddToBalance(10.0)
    balance := c1.GetBalance()
    
	//property
	fmt.Printf("\nNew %v balance: %v", c1.Person.FirstName, balance) 
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
print(f" New {c1.person.firstName} balance: {new_balance}")
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

## Sing
```rust

requires "sio";
requires "mod1";


public fn singmain(argv [*]string) i32
{
    var c1 mod1.Customer;
    c1.person.first_name = "Mark";

    sio.print("\n\r" + c1.person.first_name + ", " + c1.person.second_name);

    c1.add_to_balance(100.0);
    c1.add_to_balance(10.0);

    sio.print("\n\rNew Balance: " + string(c1.get_balance()));
    return(0);
}

//in a different file named mod1.sing:
public class Person {
    public:
    //members with default
    var first_name string = "John";
    var second_name string = "Doe";
}

public class Customer {
    public:
    var person Person;
    fn mut add_to_balance(sum f64) void;
    fn get_balance() f64;
    private:
    var balance f64;
}

public fn Customer.add_to_balance(sum f64) void
{
    this.balance = this.balance + sum;
}

public fn Customer.get_balance() f64
{
    return (this.balance);
}
```
## TypeScript
``` typescript

class Person {
    firstName: string;
    secondName: string;
    //Default/Optional parameters 
    constructor(fname: string = "John", sname: string = "Doe") {
        this.firstName = fname;
        this.secondName = sname;
    }
}

class Customer {
    person: Person;
    private _balance: number = 0.0;
    constructor(p: Person) {
        this.person = p;
    }
    addToBalance(sum: number) {
        this._balance += sum;
    }
    getBalance() {
        return this._balance;
    }
}

var p1 = new Person("Mark");
var c1 = new Customer(p1);
c1.person = p1;

//Method
c1.addToBalance(100.0);
c1.addToBalance(10.0);

//Property
var pname = c1.person.firstName;
var balance = c1.getBalance();

console.log(`New ${pname} balance: ${balance}`);
```