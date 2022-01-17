// let root = document.getElementById("root");
// The Dom way of adding element;

// let ele = document.createElement("h1");
// ele.innerHTML = "Hello";
// root.appendChild(ele);

// React we get from the first cdn link
// ReactDOM from the DOM link

// let ele = React.createElement("h1",{children:["Hello"]});
// console.log(ele);
// ReactDOM.render(ele,root);

//Humne realise kara ye toh bohot difficult lag raha hai 
// Phir Difference kya hi aaya previous way aur iss way mai

// So react mai HTML aur JS ko merge kar sakte hai usse JSX kehte hai

// function Element(){
//     return(
//         <h1> Hello </h1>
//     );
// }

// function Main(){
//     return (
//         <>
//         <Element/>
//         <Element/>
//         <Element/>
//         <Element/>
//         </>
//     )
// }

// ReactDOM.render(<Main/>, document.getElementById("root"));


//Agar Functional Component mai Hame Properties pass Karne ho toh Kaise Kare??


// function Element({name ="Aishwarya",age = "25"}){
//     return(
//         <>
//         <h1>Hello </h1>
//         <h2>{name}</h2>
//         <h3>{age}</h3>
//         </>
//     )
// }

// function Main(){
//     return(
//         <>
//         <Element name = "Nipoon" age = "25" />
//         <Element/>
//         <Element/>
//         <Element/>
//         </>
//     )
// }


// ReactDOM.render(<Main/>, document.getElementById('root'));


//Functional Components can only be used to render the static data on the screen
//Iss liye Hooks ka use karte hai state manage karne ke liye jo hum badmai padhenge