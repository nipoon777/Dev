let arr = [1, 2, 3, 4, 5];

//Haar ek element of the array mai kuch agar operations karne pade
// toh traditionally to hum for loop use karte hai
// Leking React ke time hum for nahi use kar sakte iss liye hum 
// Map aur filter functions ka use karte hai


// let narr = [];

// for( let i =  0 ; i < arr.length ; i++ ){
//     narr[i] = 2 * arr[i];
// }

// console.log(arr);
// console.log(narr);

//A better way to do this

let narr = arr.map( function (val, idx) {
    console.log(val, idx);
    return val * 2;
});

console.log(arr);
console.log(narr);