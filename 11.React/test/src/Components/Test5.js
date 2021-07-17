// import React from 'react'
import React, { createContext, useContext } from 'react';

function Test5() {
const MyContext = createContext(1);
const MyComponent = () => (
 <>
 <p>{useContext(MyContext)}</p>
 <MyContext.Provider value={2}>
 <p>{useContext(MyContext)}</p>
 </MyContext.Provider>
 </>
);
export default MyComponent;
}

export default Test5
// 1
// 2