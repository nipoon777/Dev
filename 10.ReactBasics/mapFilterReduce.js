let arr = [25,10, 20, 30, 40, 50 ];
// let darr = []
// for( let i = 0 ; i < arr.length ; i++ ){
//     darr[i] = 2*arr[i];
// }
// console.log(darr);


/* 
    Map is a higher order function it takes function as a input parameter
    Each element of an array is passed through this function and twice of the function is calculated

*/
let darr = arr.map(function(elem){
    return 2*elem;
})

console.log(darr);

/* 
    It will return the value which satisfy the condition in the return statement

*/
let minArr = arr.filter(function(elem) {
    return elem < 80;
})

console.log(minArr);

let words = ["hello", "hellllii", "hoowowwm,m.,","njjkshjkfak"];

let maxLenN =[];
for( let i = 0 ; i < words.length ; i++ ){
    if( words[i].length > 5 ){
        maxLenN.push(words[i]);
    }
}
console.log(maxLenN);
let maxLen = words.filter(function(word){
    return word.length >5;
})
console.log(maxLen);



/* 
    Reduce
    ye function do paramater leta hai accumalator and cVal 
    jo bhi reduce se return hota hai vo accumulator mai jata hai
    initially accumulator mai 1st value of the array present hoti hai
*/


let sum = 0;

for( let i = 0 ;i < arr.length ; i++ ){
    sum += arr[i];
}
console.log(sum);


let sum1 = arr.reduce(function(acc, cVal){
    console.log("Acc -> " + acc + "Current Value -> "+ cVal);
    return acc + cVal;
})
console.log(sum1);