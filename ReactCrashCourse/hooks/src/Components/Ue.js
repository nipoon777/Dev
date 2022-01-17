import React, {useState, useEffect} from 'react'
// Works as ComponentDidMount and Component Did Update
function Ue() {
     const [count, setCount] = useState(0);

     useEffect(() =>{
        console.log("UseEffect called");
        document.title = `Count :${count}`
     })

    console.log("render is called");
    return (
        <div>
            <h1> Current count {count} </h1>
            
            <button onClick = {() => setCount(count + 1)}> +1 </button>
            
        </div>
    )
}

export default Ue
