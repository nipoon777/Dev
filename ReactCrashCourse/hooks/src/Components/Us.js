import React, {useState} from 'react'

function Us() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("Hello")
    return (
        <div>
            <h1> Current count {count} </h1>
            <h1> Change me { text} </h1>
            <button onClick = {() => setCount(count + 1)}> +1 </button>
            <input type = "text" onChange={(e) => setText(e.target.value)}></input>
        </div>
    )
}

export default Us
