let person = {
    name : "Bruce",
    age : "27",
    job : "batman",
    address :{
        country:"USA",
        city:"Gotham"
    },
    toys:{
        batmobile:"yes",
        girfriend:{
            butler :"Alfred",
            catwoman :"katylyn",
            enemies :{
                name:"bane",
                age:"30"
            }
        }

    }
}

// Lets first try and access catwoman traditional way

console.log(person.toys.girfriend.catwoman);

// Using destructuring the key name should match with the one in object and nested objects mai we need to search in :{}

// let { toys :{girfriend :{catwoman}}} = person;
// console.log(catwoman);
//Giving aliases to the variables
// now name key will be called as "a"
let {name : a} = person;
console.log(a);