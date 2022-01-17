import React,{useState} from 'react'
import {storage} from '../firebase';


function FireStorage() {
    const [file, setfile] = useState('');

    const upload = () =>{
        console.log(file);

        const uploadTask = storage.ref(`/data/${file.name}`).put(file);
        uploadTask.on('state_changed',fn1, fn2,fn3);//fn1 - progress, fn2 - error, fn3- success
        
        function fn1(SnapShot){
            let progress =  (SnapShot.bytesTransferred /SnapShot.totalBytes ) * 100;
            console.log(`Upload is ${progress} done`);
        }

        function fn2(error){
            console.log("error", error);
        }
        function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log(url);
            })
            
        }
    }

    return (
        <div>
            <label htmlFor='File'></label>
            <input type="file" accept='image/*' onChange={ (e) => setfile(e.target.files[0])}></input>
            <button onClick={upload}>Upload</button>
            
        </div>
    )
}

export default FireStorage
