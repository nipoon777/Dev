let obj = {
  person: "Nipoon",
  fn: fon,
};

// function fon() {
//   console.log(`Hi my name is ${this.person}`);
//   console.log(this);

//   function abc() {
//     console.log(this);
//   }
//   this.abc();
//   //Yaha normal function call hua hai toh this mai global value store hoga naki jo this humne pass kiya
//   //Agar yaha hum this.abc() call karne ki try kare toh socho this mai obj store hua hai usmai kya abc() function present hai
//   //toh vo error dega this.abc is not a function
// }

// obj.fn();

/////////////////////////////////BIND

/* 
    Bind function ek function return karta hai jiski this ki value jo bhi bind ke argument mai pass
    hoti hai vo ho jati hai
*/

// function fon() {
//   console.log(`Hi my name is ${this.person}`);
//   console.log(this);

//   function abc() {
//     console.log(this);
//   }

//   let ret = abc.bind(this);
//   ret();
// }

// obj.fn();

/* 
    Arrow function kaise kaam karta hai chalo uspe aate hai abhi
    Arrow function mai jo bhi lexically superior hota hai uska this aa jata hai
*/
let clickBtn = document.querySelector(".btn");

function fon() {
  console.log(`Hi my name is ${this.person}`);
  console.log(this);

  let abc = () => {
      
    console.log(this);
  };
  abc();
}

obj.fn();

clickBtn.addEventListener("click", obj.fn);
