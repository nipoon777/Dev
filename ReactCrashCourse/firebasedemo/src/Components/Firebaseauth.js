
import React,{useState, useEffect} from 'react'
import { auth } from '../firebase'
function Firebaseauth() {
    const [user, setuser] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');

    let createUser = async() =>{
        const res = await auth.createUserWithEmailAndPassword(email, password);
        console.log(res);
    }

    useEffect(() => {
        let unsub = auth.onAuthStateChanged((user) => setuser(user));
        return () => {
            unsub();
        }
    })
    let logout = async() =>{
        await auth.signOut();
    }
    let signIn = async () =>{
        await auth.signInWithEmailAndPassword(email, password);
    }
    return (
        <>
        {user == null ?
        <div>
            <label htmlFor='Email'>Email</label>
            <input type="text" value ={email}onChange={ (e) => setemail(e.target.value)}></input>
            <label htmlFor='password'>Password</label>
            <input type = "password" value = {password} onChange={ (e) => setpassword(e.target.value)}></input>
            <button onClick={ signIn }>Login</button>            
        </div> :
        <>
            <div>
                {email}

            </div>
            <button onClick={logout}>Log out</button>
        </>
        }
        </>
    )
}

export default Firebaseauth
