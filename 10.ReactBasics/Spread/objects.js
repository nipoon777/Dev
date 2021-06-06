const state = {
    name : "Nipoon",
    address : {
        city : "Tempe",
        country : {
            countryName : "USA",
            countryCode : "US"
        }
    }
}

//  Here when we use spread it makes new object immutablely and one does copy the objects of that particular layer only
// the nested address ka only the address is copied

// let copy = {...state};
// console.log(copy);

//Nested object

let copy = {...state,address:{...state.address}};

copy.address.city = "Nipoon";
console.log(state);
console.log(copy);