let arr = [1, 2, 3, 4, 5, 6];

let index = 3;
// I have to insert a number 10 at index 3 in new Array immutably

// 1 way to do this loop throgh the array

let narr = [];
/* 
for(let i = 0 ; i < arr.length ; i++ ){
    if( i < index ){
        narr[i] = arr[i];
    }else if( i == index){
        narr[i] = 10;
    }else{
        narr[i] = arr[i];
    }
}
console.log(narr); */

/* 
    there has to be a better way to do this
    lets try slice first
    but for slice each slice returns a new array
    lets check
*/

// narr = [arr.slice(0, index), 10, arr.slice(index + 1)];
// console.log(narr);

/* [ [ 1, 2, 3 ], 10, [ 5, 6 ] ] */

// We can use slices as it spreads the elements
// narr = [...arr.slice(0, index), 10, ...arr.slice(index+ 1)];
// console.log(narr);
// let arr = [1, 2, 3, 4, 5, 6, 7, 8];

let [fv, sv, tv, ...darr] = arr;
console.log(darr);
console.log(fv);