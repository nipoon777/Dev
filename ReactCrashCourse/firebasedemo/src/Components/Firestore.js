import React,{useState,useEffect} from 'react';
import {database} from "../firebase";

function Firestore() {
    const [name, setname] = useState("");
    const [age, setage] = useState("");

    let createUserInDb = async() => {
        // let res = await database.users.add({name, age});
        let res = await database.users.doc("11111").set({name, age});// Create Unique Id of your choice, Not recommended

        console.log(res);

    }

    useEffect(async() => {
        let uuid = "Vd5CqpWURjQ6nqoo1uJ1"
        // let data = await database.users.doc(uuid).get();//SnapShot// READ operations
        // console.log(data.data());
        let data = await database.users.get();

        data.forEach ((obj) => console.log(obj.data()));
    })
    return (
        <>
            <div>
                <label htmlFor='name' >Name</label>
                <input type="text"value = {name} onChange={ (e) => setname(e.target.value)}></input>
                <label htmlFor='age'>Age</label>
                <input type = "number" value = {age} onChange={ (e) => setage(e.target.value)}></input>
                <button onClick = {createUserInDb}>Create</button>
                
            </div>
        </>
    )
}

export default Firestore
