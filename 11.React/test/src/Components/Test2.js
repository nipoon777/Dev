import React, {useEffect, useState} from 'react'

function Test2() {
    const [count, setCount ] = useState(0);
    useEffect( () =>{
        console.log("boom")
    });

    return (
        <div>
            
            <button onClick={()=>{ setCount(count+1)}}>State: {count}</button>
 
        </div>
    )
}

export default Test2
