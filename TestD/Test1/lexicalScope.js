let myVar = 20;
function c() {
    console.log("6", myVar);
}
function b(){
    let myVar = 30;
    console.log("8", myVar);
    function c() {
        console.log("4555", myVar);
    }
    
    c();
    console.log("9", myVar);
}
function a(){
    let myVar = 40;
    console.log("14", myVar);
    b();
    console.log("16", myVar);
}
console.log("18", myVar);
a();
c();
console.log("20", myVar);
