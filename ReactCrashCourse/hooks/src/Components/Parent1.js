import React,{useContext} from 'react'
import context from './Context';
function Parent1() {
    console.log("Parent1");
    let theme = useContext(context);
    return (
        <div className={theme ? 'dark' :'light'}>
            Parent1
        </div>
    )
}

export default Parent1
