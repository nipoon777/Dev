import React,{useState} from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import {v4 as uuidv4} from "uuid";

import LinearProgress from '@mui/material/LinearProgress';
import { database, storage } from '../firebase';

function UploadFile(props) {

    const [error, seterror] = useState("");
    const [loading, setloading] = useState(false);


    const handleUpload = (file) =>{
        if( file == null ){
            seterror("Please select a file to upload");
            setTimeout(()=>{
                seterror("");
            },2000)
        }

        if( file.size / (1024 * 1024) > 100 ){
            seterror("File Size exceeded");
            setTimeout(()=>{
                seterror("");
            },2000)
        }

        let uid = uuidv4();
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
            uploadTask.on('state_changed',fn1, fn2,fn3);//fn1 - progress, fn2 - error, fn3- success
            
            function fn1(SnapShot){
                let progress =  (SnapShot.bytesTransferred /SnapShot.totalBytes ) * 100;
                console.log(`Upload is ${progress} done`);
            }

            function fn2(error){
                seterror(error);
                setTimeout( () => {
                    seterror("");
                }, 2000);
                setloading(false);
                
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);

                    let obj = {
                        likes : [],
                        comments : [],
                        pId : uid,
                        pUrl : url,
                        uName : props.user.fullname,
                        uProfile : props.user.profileUrl,
                        userId : props.user.userId,
                        createdAt : database.getTimeStamp()

                    }
                    database.posts.add(obj).then ( async (ref) => {
                        let res = await database.users.doc(props.user.userId).update ({
                            postIds : props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
                        })
                        console.log(res);
                    }).then (( )=>{
                        setloading(false)
                    }).catch( (err) =>{
                        seterror(err)
                        setTimeout(()=>{
                            seterror('')
                        },2000)
                        setloading(false)
                    })
                })
            }

    }
    return (
        <div>
            { error != "" ?<Alert severity="error">{error}</Alert> 
            : 
            <>
                <input type = "file" accept='video/*' id = "upload-input" onChange = {(e) => handleUpload(e.target.files[0])} style={{display : "none"}}></input>
                <label htmlFor='upload-input'>
                <Button
                            variant="outlined"
                            color="secondary"
                            component="span"
                            disabled={loading}
                        >
                       Upload Video
                </Button>

                </label>
                {loading && <LinearProgress color="secondary" style={{marginTop:'3%'}} />}
            </>
            }
        </div>
    )
}

export default UploadFile
