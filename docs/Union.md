# Union


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