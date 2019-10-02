# Structure or Class

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
    let mut c1 = Customer::new();
    
    println!("{:?}", &c1);

    //Method
    c1.add_to_balance(100.0);
    c1.add_to_balance(10.0);

    //Property
    println!("New {} balance: {} ", &c1.person.first_name, c1.get_balance());
}

```