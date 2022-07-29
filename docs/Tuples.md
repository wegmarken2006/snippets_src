# Tuples

## Julia
```julia
using Printf

t1 = (1, 10, "hello");
@printf "%d %d %s\n" t1[1] t1[2] t1[3]

# delete an element
(a, b, c) = t1;
t2 = (a, c);
println(t2);

# tuple to list
lst = collect((1, 2, 3))
println(lst)

#  add an element
v3 = collect(t1)
insert!(v3, 2, 2)
t3 = Tuple(v3)
println(t3)
```

## Python
```python

t1 = (1, 10, "hello")
print(f'{t1[0], t1[1], t1[2]}')

# delete an element
a, b, c = t1
t2 = (a, c)
print(f'{t2}')

# add an element
t3 = (a, 2, b, c)
print(f'{t3}')

# add tuples
t4 = t2 + t2
print(f'{t4}')

# tuple to list
lst = list((1, 2, 3))
print(f'{lst}')
```

## Rust
```rust

fn main() {
    let t1 = (1, 10, "hello");
    println!("{} {} {}", t1.0, t1.1, t1.2);

    //delete an element
    let (a, b, c) = t1;
    let t2 = (a, c);
    println!("{:?}", t2);

    //add an element
    let t3 = (a, 2, b, c);
    println!("{:?}", t3);
}
```