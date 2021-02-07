// Java -> Array is collection of same data type
// JavaScript -> Array is a Collection of anything

//Chaliye Shuru Karte hai

let arr = [
    1,
    1.1,
    3,
    "String",
    null,
    false,
    function sayHi(){
        console.log("Hello javaScript");
        return "Hola";
    },
    {
        name : "Nipoon",
        age : "22"
    },
    [10, 20, 30, 49]
]
// Read aur Print karna 
//console.log(arr);

// console.log(arr[0]);

// for(let i = 0 ; i < arr.length ; i++){
//     console.log(arr[i]);
// }

// console.log(arr[6]());

// arr["Last Value"] = "Ye hai mera last Value";
//----------------------------------------------------------------------------
// for( let key in arr){
//     console.log("key ", key, "| Value", arr[key]);
// }
//Kabhi bhi Array of length quaranted length dega aise koi surety nahi hai

// console.log(arr.length);

// arr[90] = 89;
// console.log(arr);
// console.log(arr.length);


// Abhi Arrays ke functions dekhte hai

//addLast -> push
//removeLast -> pop

// arr.push(25);
// console.log(arr);
// arr.pop();

//addFirst ke liye unshift
//removeFirst ke liye shift

//slice particular parts of array nikal sakte hai 
let sliced = arr.slice(2, 4);
console.log(sliced);

//splice function is used to remove elements from array
// first paramereter is start second is count
let spliced = arr.splice(3,2);
console.log(sliced);

