import React, {useEffect, useState} from 'react'
//When we pass a empty depency array in UseEffect
// The Use effect is called only after the first Render


function UseEffect2() {
    const [count, setCount] = useState(0);
    useEffect( () =>{
        document.title = `Count ${count} times`;
        console.log("Inside UseEffect");
    }, []);
    console.log("Render");
    return (
        <>
        <div>
            You have clicked {count} times
        </div>
        <button onClick = {() => setCount(count + 1)}>Click</button>
        </>
    )
}

export default UseEffect2
