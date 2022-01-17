let obj = {
    name : "Nipoon",
    age : 24,
        country : {
            state : {
                region : "AZ",
                code : "85251"
            },
            city : "Tempe"
        }
}

let { name } = obj;
console.log(name)

//Access country
let { country } = obj;
console.log(country);
//Access code
let { country : { state :{code :Pincode }}} = obj
console.log(Pincode);