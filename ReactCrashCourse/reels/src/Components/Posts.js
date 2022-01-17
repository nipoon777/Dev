import React, {useState, useContext, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {database} from "../firebase";
import Video from './Video';
import "./Posts.css"

function Posts( {userData}) {
    const [post, setpost] = useState(null);



    useEffect(() => {
        let parr = [];

        const unsub = database.posts.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
            parr = []

            querySnapshot.forEach( (doc) => {
                let data = { ...doc.data(), postId : doc.id}
                parr.push(data)
            })

            setpost(parr);
        })
        return () => {
            unsub()
        }
    }, [])
    return (
        <div>
            {
                post == null || userData == null ? <CircularProgress/>
                :
                <div className='video-container'>
                    {
                        post.map ((post, index) => (
                            <React.Fragment key = {index} >
                                <div className='videos'>
                                    <Video src = {post.pUrl} id = {post.pId} />
                                </div>


                            </React.Fragment>
                        ))
                    }
                   
                </div>
            }
        </div>
    )
}

export default Posts
