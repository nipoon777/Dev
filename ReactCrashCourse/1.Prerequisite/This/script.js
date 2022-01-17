// This hamesha koi object ke sath associated hota hai
// Agar koi object ne nahi call kiya toh hum global object ko reference karte jo Global 
// Execution Context mai banta hai
// console.log(this);


// We are considering (this) in browser and non strict mode only

// function fn(){
//     console.log(this);
// }
// fn();


// // console.log(this);
// function fn(){
//     function abc(){
//         console.log(this);// Window object hi call hoga
//     }
//     console.log(this);
//     abc();
// }


// Method 1 - Binding this
// function fn(){
//     function abc(){
//         console.log(this);// Window object hi call hoga
//     }
//     console.log(this);
//     let ret = abc.bind(this);// Returns a function definition
//     ret();
// }
// Method 2 - Arrow Function
// Vo parent ka this use karta hai..
function fn(){
    let abc = ()=> {
        console.log(this);// Window object hi call hoga
    }
    console.log(this);
    abc();
}
let obj = {
    name : "Nipoon",
    fun : fn
}

obj.fun();
//Yaha ye object ke liye this associate hoga
