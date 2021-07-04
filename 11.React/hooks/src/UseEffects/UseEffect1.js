import React , {useState, useEffect} from 'react'
// It has characteristics features of both useState and useEffect
// It runs after every render
// A render is completed after the function is executed completely


function UseEffect1() {
    const [count, setCount] = useState(0);
    useEffect ( () => {
        console.log("Inside Use effect");
        document.title = `Clicked ${count} times`;
    });
    console.log("Render")
    return (
        <>
        <div>
            You have clicked { count } times
        </div>
            <button onClick = {() => setCount(count + 1) }>Click</button>
        </>
    )
}

export default UseEffect1
