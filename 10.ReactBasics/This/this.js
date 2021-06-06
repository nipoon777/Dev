function fon(){
    console.log( this.message + this.name );
}

let obj = {
    person: "Nipoon",
    greeting: {
        message : "welcome",
        fn : fon
    }
}

obj.greeting.fn();

//Output
//welcomeundefined