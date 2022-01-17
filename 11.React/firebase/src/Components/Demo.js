import React, {useState, useEffect} from 'react';
import firebase from './firebase';


function Demo() {
    const auth = firebase.auth();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoad] = useState(false);

    const handleSubmit = async () =>{
        try{
            console.log(email + " "+ password);
            setLoad(true);
            let res = await auth.signInWithEmailAndPassword(email, password);
            console.log(res.user);
            setUser(res.user);
            setLoad(false);

        }catch(e){
            setError(e.message);
            setTimeout(()=>{
                setError("")                
            }, 2000);
            setLoad(false);
        }
        setEmail('');
        setPassword('');
    }
    const handleSignout = async() =>{
        try{
            setLoad(true);
            let res = auth.signOut();
            console.log(res);
            setUser(null);
            setLoad(false);
        }catch(e){
            setError(e.message);
            setTimeout(()=>{
                setError("")
            }, 2000);
            setLoad(false);
        }
    }
    return (
        <>
        {
            loading ? <h1> Please wait.. loading </h1>:
            user == null ?
            <>
            <div>
                <label>
                    Email:
                    <input type = "text" onChange = { (e) => setEmail(e.target.value) }></input>
                </label>
                <label>
                    PassWord:
                    <input type = "text" onChange = { (e) => setPassword(e.target.value)}/>
                </label>
                <button onClick = { handleSubmit}> Sign In</button>
                { error ? <h1>{error}</h1> : <> </>}
            </div>
            </>:
                <>
                <h2>{user.uid} is Signed in </h2>
                  <button onClick = {handleSignout} >Sign Out</button>
                </>
    }    
        </>

    )
}

export default Demo
