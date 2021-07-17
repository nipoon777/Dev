import React, {useState, useContext,useEffect} from 'react';
import {auth} from "../firebase";

const AuthContext = React.createContext();



// <Component> ===== props.children ====== </Component>

function AuthProvider({children}) {
    const [currUser, setCurrUser] = useState();
    const [loading, setLoading] = useState(true);


    function signUp(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut();
    }

    useEffect ( () =>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrUser(user);
            setLoading(false);
        });
        return () =>{
            unsubscribe();
        }
    },[])
    const value = {
        currUser,
        login,
        signUp,
        logout
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>        
    )
}

export default AuthProvider
