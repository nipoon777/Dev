import React , {useState } from 'react'

function Test3() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => {setCount(count + 1)}}>Count: {count}</button>
        </div>
    )
}

export default Test3
