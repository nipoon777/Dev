let obj = 
{
    name : "Nipoon",
    age : 24,
    country : "India"
};

// //Traditional way
// let name = obj.name;
// console.log(name);

// let { name } = obj;

// console.log(name);
// Alias bhi de sakte hai
// let { name:firstname } = obj;

// console.log(firstname);

// Default value bhi de sakte hai
let { name:firstname = "Aish", age, country, gender = "Male" } = obj;

console.log(firstname, age, country, gender);