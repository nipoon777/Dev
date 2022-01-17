import React, {useContext} from 'react';
import {AuthContext } from "../Context/AuthContext";

import { Navigate } from "react-router-dom";


function PrivateRouter({ children }) {

    const { user } = useContext(AuthContext);
    console.log( user, children);
    return (
            
        
        user ? children : < Navigate to = 'login' />
            
    )
}

export default PrivateRouter
