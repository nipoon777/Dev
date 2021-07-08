import React, {useState} from 'react'
import Demo from './Demo';
import MyContext from './Context';
import DemoChild from './DemoChild';

function MainComponent() {
    const [count,setCount] = useState(0);

    return (
        <div>
            <button onClick = {()=> setCount(count + 1)}>Click</button>  
            < MyContext.Provider value = {count}>
                <DemoChild/>
            </MyContext.Provider>       
        </div>
    )
}

export default MainComponent
