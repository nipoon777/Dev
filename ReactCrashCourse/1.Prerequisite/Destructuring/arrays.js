let arr = [1, 2, 3, 4];

// //Traditional value of accessing data members
// let a = arr[0];
// let b = arr[1];
// console.log(a, b);

//Destructuring

// let [a, b] = arr;
// console.log(a, b);
//To skip some values toh , daal do extra

// let [a, b,,d] = arr;
// console.log(a, b, d);

// let [a, b,,d, extra] = arr;
// //Extra goes out of bound toh undefined return karega
// console.log(a, b, d, extra);

let [a, b,,d, extra = 777] = arr;
//Extra goes out of bound toh undefined return karega par usse ek default value bhi de sakte hai
// AGar value na mile toh hi default value leega varna jo bhi value aayega vohi milega
console.log(a, b, d, extra);


//Arrays mai Alias name nahi de sakte;