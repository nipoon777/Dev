import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadFile from './UploadFile';
import {database} from "../firebase";
import Posts from "./Posts";
import Navbar from './Navbar';

function Feed() {
    const {user, logout} = useContext(AuthContext);
    const history = useNavigate();
    const [userData, setuserData] = useState("");
    useEffect(() => {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setuserData(snapshot.data())
        })
        return () => {
            unsub()
        }
    }, [user])

    const handlelogout = async () => {
        await logout();
        console.log("logout is called");
        history("/login");
    }
    return (
        <>
        <Navbar userData={userData}/>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            {/* <div className='comp' style = {{ width : "50%" }}>
                <h1>Hello</h1>
                <button onClick={handlelogout}>Logout</button>
                
            </div> */}
            <UploadFile user = {userData} />
            <Posts userData = {userData} />
        </div>
        </>
    )
}

export default Feed
