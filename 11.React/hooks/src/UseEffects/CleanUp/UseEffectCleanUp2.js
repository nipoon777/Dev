import React, {useState, useEffect} from 'react'

function UseEffectCleanUp2() {
    const [count, setCount] = useState(0);
    console.log("render");
    useEffect ( () =>{
        console.log("Use effect");
        document.title = `Count clicked ${count} times`;
        //Clean Up Iss case mai return componentDid Unmount ki taraha kaam karega 
        // Kyuki iss case mai usse effect sirf first render ke baad hi call hota hai
        return () =>{
            alert(`I will be called before the next useEffect is called ${count}`);
        }
    },[])
    return (
        <div>
            <p> {count} </p>
            <button onClick = { ()=> setCount(count + 1) }>Click</button>
        </div>
    )
}

export default UseEffectCleanUp2
