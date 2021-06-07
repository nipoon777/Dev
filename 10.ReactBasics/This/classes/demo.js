// class Person {
//   constructor(person, age) {
//     this.person = person;
//     this.age = age;
//   }

//   sayHi() {
//     console.log(this);
//     console.log(this.person);
//     console.log(this.age);
//   }
// }
// // this ki value Object / new keyword ke time pe decide hoti hai
// // uska as such koi meaning nahi hota
// let obj = new Person("Nipoon", "23");
// // let ret = obj.sayHi;
// // ret();
// // We cannot make this call because classes by default "use strict" due to which this is passed as undefined
// // sayHi();

// let btn = document.querySelector(".btn");

// btn.addEventListener("click", obj.sayHi);
// // isse Button pass hoti hai as this aur uske paas koi person ya age value nahi hai toh iss chis ko avoid karne ke liye
// // Humlog arrow function ya bind ka use karte hai
// // Arrow function mai this ki value creation ke time jo bhi uske lexically superior value hota hai usse define hota hai

// // lets try to solve this using arrow and binding

// /* ====== Bind ====== */

// class Person{
//     constructor(person, age){
//         this.person = person;
//         this.age = age;
//         this.sayHi = this.sayHi.bind(this);
//     }

//     sayHi(){
//         console.log("Hi From", this.person);
//         console.log(this);
//     }
// }
// let obj = new Person("Nipoon", "24");

// let btn = document.querySelector(".btn");

// btn.addEventListener("click", obj.sayHi);

/* ======= Arrow Function ======== */

class Person{
    constructor(person, age){
        this.person = person;
        this.age = age;
        
    }

    sayHi = () => {
        console.log("Hi From", this.person);
        console.log(this);
    }
}
let obj = new Person("Nipoon", "24");

let btn = document.querySelector(".btn");

btn.addEventListener("click", obj.sayHi);



