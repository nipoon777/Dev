import React, {useEffect, useState} from 'react'
import "./us.css"
function UseEffect3() {
    const [count, setCount] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    useEffect ( () => {
        document.title = `Clicked ${count} times`;
        console.log("Effect");
    },[count])

    console.log("Render");
    return (
        <div className = { darkMode ? "view dark-mode" : "view"}>
            <label htmlFor="darkmode">Dark Mode </label>
            <input type = "checkbox" checked = {darkMode} onChange = {()=> setDarkMode(!darkMode)}/>
            <button onClick = {()=> setCount(count + 1)}>{count}</button>
        </div>
    )
}

export default UseEffect3
