import React, {useState, useEffect} from 'react'
//Only once the call will be made It will work as component did mount
// For Infinite and dependency array effect check the previous hooks class notes in hooks folder
function Ue1() {
    const [count, setcount] = useState(0)

    useEffect(() => {
        console.log("Use Effect empty array");
        document.title = `Count ${count}`;
    }, [])
    console.log("Render was called");
    return (
        <div>
            <h1>Count is {count}</h1>
            <button onClick={() => setcount(count + 1)}> +1</button>
        </div>
    )
}

export default Ue1
