// let arr = ["Nipoon", "Aishwarya", "Bhavitha", "Chaitanya", "Manaswini"];

//I want to extract only those name who length is less tha 8

// let narr = [];

// for(let i =0 ; i < arr.length ; i++ ){
//     if( arr[i].length < 8 ){
//         narr.push(arr[i]);
//     }
// }

// Using Filter
let arr = [1,5,2,3,4]
let narr = arr.filter( (val) => {
    return val.length < 8
})
console.log(arr);
console.log(narr);

let totalSum = arr.reduce( (acc, cVal) =>{
    return acc+cVal;
})

console.log(totalSum);