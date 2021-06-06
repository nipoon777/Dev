let obj = {
    person : "Nipoon",
    fn : fon
}

function fon(){
    console.log(`Hi my name is ${this.person}`);
    console.log(this);

    function abc(){
        console.log(this);
    }
    abc();
    //Yaha normal function call hua hai toh this mai global value store hoga naki jo this humne pass kiya
    //Agar yaha hum this.abc() call karne ki try kare toh socho this mai obj store hua hai 
}

obj.fn();


