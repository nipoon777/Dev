import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Button, CardActions } from '@mui/material';
import "../Style/signup.css";
import insta from "../Assets/Instagram.JPG";
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { useState , useContext} from 'react';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';

export default function SignUp() {
    const useStyles = makeStyles ({
        text1 : {
            color: 'grey',
            textAlign : 'center'
        },
        card2 :{
            height : "6vh"
        }
        
    })
    const classes = useStyles();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");
    const [error, seterror] = useState("");
    const [loading, setloading] = useState(false);
    const [file, setfile] = useState(null);

    const history = useNavigate();

    const {signup} = useContext(AuthContext);

    const handleSignUp = async () =>{
        if( file == null ){
            seterror("Please upload Profile Picture");
            setTimeout( () => {
                seterror("");
            }, 2000);

            return;
        }
        try{
            seterror("");
            setloading(true);
            let userObj = await signup(email, password);
            let uuid = userObj.user.uid;
            
            const uploadTask = storage.ref(`/users/${uuid}/ProfileImage`).put(file);
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
                return;
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);

                    database.users.doc(uuid).set({
                        email : email,
                        userId : uuid,
                        fullname : name,
                        profileUrl : url,
                        createdAt : database.getTimeStamp()
                    })
                })
                setloading(false);
                history("/");
            }

        }catch(err){
            seterror(err);

            setTimeout(() => {
                seterror("")
            }, 2000);
        }
    }


  return (
    <div className="signUpWrapper">
        <div className ="signUpCard">
            <Card variant = "outlined">
                <div className='insta-logo'>
                    <img src= {insta} alt='instagram'/>
                </div>
                
                <CardContent>
                    <Typography className = {classes.text1} variant = "subtitle1">
                        Sign Up to see photos and videos of your friends
                    </Typography>
                    { error != "" && <Alert severity="error" variant = "outlined" size = "small" fullWidth = {true} margin = "dense">{error}</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth ={true} margin = "dense" size = "small" value = {email} onChange={ (e) => setemail(e.target.value)}/>
                    <TextField id="outlined-basic" type = "password" label ="Password" variant="outlined" fullWidth ={true} margin = "dense" size = "small" value = {password} onChange={ (e) => setpassword(e.target.value)}/>
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth ={true} margin = "dense" size = "small"value = {name} onChange={ (e) => setname(e.target.value)}/>
                    
                    <Button variant = "outlined" size="small" color="secondary" fullWidth = {true} variant = "outlined" margin = "dense"  component = "label">
                        Upload Profile Picture
                        <input type = "file" accept = "image/*" hidden onChange = {(e) => setfile(e.target.files[0])} ></input>
                    </Button>

                </CardContent>
                
                <CardActions>
                    <Button size="small" color="primary" fullWidth = {true} margin = "dense" variant = "contained" disabled = {loading} onClick = {handleSignUp}>
                    Sign Up
                    </Button>
                </CardActions>
                <CardContent>
                <Typography className={classes.text1} variant="subtitle1">
                        By signing up, you agree to our Terms, Conditions and Cookies policy.
                    </Typography>
                </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card2}>
                <CardContent >
                    <Typography className={classes.text1}  >
                        Having an account ? <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
                    </Typography>
                </CardContent>
            </Card>


        </div>
    </div>
    
  );
}
