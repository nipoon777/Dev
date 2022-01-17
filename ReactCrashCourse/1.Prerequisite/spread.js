// Major learning was about deep copy and shallow copy


// Arrays mai Spread Operator kaise kaam karta hai phir object pe jayenge

let arr = [ 1, 2, 3];

let arr1 = arr;
// arr1.push(4);

// console.log(arr);
// console.log(arr1);

// Humne dekha ki yar yaha toh dono mai change ho raha hai..
// ?? aise kyu ho raha hai -- Reason hai arrays heap memory mai banti hai aur unka sirf reference stack mai 
// store hota hai
// Changes dono mai hi same ho jayega


// Solution

// let arr2 = [...arr];
// arr2.push(4);
// console.log(arr);
// console.log(arr2);

// console.log(...arr);



// Objects mai Spread kaise kaam karega


let obj = {
    name : "Nipoon",
    age: "25",
    address : {
        country : "US",
        region : {
            state : "AZ",
            pin : 85281
            }
        }
}

// let obj2 = obj;
let obj2 = {...obj, address :{...obj.address, region : {...obj.address.region}}}


obj2.name = "Aish";
obj2.address.country = "India";
obj2.address.region.state = "Jharkhand";

console.log(obj);
console.log(obj2);

let obj3 = JSON.parse(JSON.stringify(obj));
obj3.name = "Bhavitha";
obj3.address.region.state = "Seattle";

console.log(obj3);