import React ,{useState, useEffect, useContext} from 'react'
import { AuthContext } from "../Context/AuthProvider";
function SignUp() {
    const [ email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const {signUp} = useContext(AuthContext);

    const handleSignUp = async (e) =>{
        e.preventDefault();

        try{
            setLoading(true);
            let res = await signUp(email, password);
            let uid = res.user.uid;
            console.log(uid);
            setLoading(false);
        }catch(e){

            console.log(e);
        }
    }



    return (
        <div>
            <form onSubmit = {handleSignUp}>
                <div>
                    <label htmlFor = "">Username</label>
                    <input type = "text" value = {name} onChange = {(e) => setName(e.target.value)}/> 
                </div>
                <div>
                    <label htmlFor = "">Email</label>
                    <input type = "text" value = {email} onChange = {(e) => setEmail(e.target.value)}/> 
                </div>

                <div>
                    <label htmlFor = "">Password</label>
                    <input type = "text" value = {password} onChange = {(e) => setPassword(e.target.value)}/> 
                </div>
{/* 
                <div>
                    <label htmlFor = "">Profile Photo</label>
                    <input type = "file" value = {email} onChange = {(e) => setEmail(e.target.value)}> </input>
                </div> */}
            
                <button type = "submit" disabled = {loading}>SignUp</button>
            </form>

        </div>
    )
}

export default SignUp
