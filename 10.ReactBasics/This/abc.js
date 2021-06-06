//console.log(this); Here in the browser this will behave differently then the node ka this because browser mai this 
//Window se define hota hai

function fon(){
    console.log(this.person);
    console.log(this);
}

let obj = {
    person : "Nipoon",
    fn : fon
}
/* 
    Yaha pe sirf function definition pass ho raha hai
    this ka value hamesha how it is called pe depend karta hai yaha

// */
// let rn = obj.fn;
// rn();

// console.log(this);

obj.fn();