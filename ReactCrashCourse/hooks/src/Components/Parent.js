import React, {useContext} from 'react'
import Child from './Child'
import context from './Context';

function Parent() {
    console.log("Parent");
    let theme = useContext(context);
    return (
        <div >
            <div className={theme ? 'dark' : 'light'}>Parent</div>
            <Child theme = {theme}/>
        </div>
    )
}

export default Parent
