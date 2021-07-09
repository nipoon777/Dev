import React, {useState} from 'react';
import ThemeContext from './ThemeContext';
import Navbar from './Navbar';


function Central() {
    const [ntheme, setnTheme] = useState('Light');

    return (
            <ThemeContext.Provider value = {{theme : ntheme, chfn : setnTheme}}>
                <div>
                    <Navbar/>
                </div>
            </ThemeContext.Provider>
    )
}

export default Central;
