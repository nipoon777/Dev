import React, {useState, useEffect} from 'react'

function Infinite() {
    const[count, setCount] = useState(0);
    useEffect ( () => {
        let num = Math.random() * 10;
        console.log("Inside Use Effect");
        setCount(num);
    })
    console.log("Render");
    return (
        <div>
            <h1> You clicked { count } times</h1>
            <button onClick = {()=> setCount(count + 1)}>Click</button>
        </div>
    )
}

export default Infinite
