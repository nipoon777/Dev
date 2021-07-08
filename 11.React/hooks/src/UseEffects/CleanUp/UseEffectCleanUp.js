import React, {useState, useEffect} from 'react'

function UseEffectCleanUp() {
    const [count, setCount] = useState(0);
    console.log("render");
    useEffect ( () =>{
        console.log("Use effect");
        document.title = `Count clicked ${count} times`;
        //Clean Up 
        return () =>{
            alert(`I will be called before the next useEffect is called ${count}`);
        }
    })
    return (
        <div>
            <p> {count} </p>
            <button onClick = { ()=> setCount(count + 1) }>Click</button>
        </div>
    )
}

export default UseEffectCleanUp
