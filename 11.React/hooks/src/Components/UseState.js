import React, { useState } from 'react'

function UseState() {
    const [msgObj, setMsgObj] = useState({id :1,message : ""});
    // When changing objects in Hooks the react element compares only the address between old state and
    //new State so when comparing if the address remains same the state does not change
    const handleMsg = (e) =>{
        let newMsg = e.target.value;
        // msgObj.message = newMsg
        // setMsgObj( msgObj );
        //So in order to prevent this we need to spread the original object and all the changes will 
        //be done unlike setState which can change only few elements in state
        setMsgObj({...msgObj, message : newMsg});
        console.log(newMsg);
    }
    return (
        <>
        <input type = "text" value = {msgObj.message} onChange = {handleMsg}></input>
        <p>{msgObj.message}</p>
        </>
    )
}

export default UseState
