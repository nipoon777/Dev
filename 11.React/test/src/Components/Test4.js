import React ,{useState, useEffect} from 'react'

function Test4() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    useEffect(() => {
    console.log("Count is updated");
    },[count]);
    return (
    <div>
    <button onClick={() => setCount(count + 1)}>State: {count}</button>
    <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    />
    </div>
    );
}

export default Test4
