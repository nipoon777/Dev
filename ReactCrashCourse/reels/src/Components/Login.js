import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import "../Style/login.css"
import insta from "../Assets/Instagram.JPG";
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import bg from "../Assets/insta.png";
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import {AuthContext} from "../Context/AuthContext"
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useContext, useState } from 'react';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");

    const history = useNavigate();

    const {login} = useContext(AuthContext);
    
    const useStyles = makeStyles ({
        text1 : {
            color: 'grey',
            textAlign : 'center'
        },
        card2 :{
            height : "6vh"
        },
        text2 :{
            textAlign : "center"
        }
        
    })
    const classes = useStyles();

    const handleLogin = async() =>{
        try{
            setloading(true);
            seterror("");
            const res = await login(email, password);
            setloading(false);

            history("/");


        }catch(err){
            seterror(err);
            setTimeout( () =>{
                seterror("")
            },2000);
            setloading(false);

        }
    }
  return (
    <div className='loginWrapper'>
        <div className='imgcar' style = {{backgroundImage : 'url(' + bg +')', backgroundSize:'cover'}}>
            <div className='car'>
            <CarouselProvider
                    visibleSlides={1}
                    totalSlides={5}
                    naturalSlideWidth={238}
                    naturalSlideHeight={423}
                    hasMasterSpinner
                    isPlaying={true}
                    infinite={true}
                    dragEnabled={false}
                    touchEnabled={false}
                >
                    <Slider>
                    <Slide index={0}><Image src={img1}/></Slide>
                    <Slide index={1}><Image src={img2}/></Slide>
                    <Slide index={2}><Image src={img3}/></Slide>
                    <Slide index={3}><Image src={img4}/></Slide>
                    <Slide index={4}><Image src={img5}/></Slide>
                    </Slider>
                </CarouselProvider>
            </div>
        </div>


        <div className ="loginCard">
            <Card variant = "outlined">
                <div className='insta-logo'>
                    <img src= {insta}/>
                </div>
                
                <CardContent>
                    { error != "" && <Alert severity="error" variant = "outlined" size = "small" fullWidth = {true} margin = "dense">{error} </Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth ={true} margin = "dense" size = "small" value = {email} onChange={(e) => setemail(e.target.value)}/>
                    <TextField id="outlined-basic"  type = "password" label="Password" variant="outlined" fullWidth ={true} margin = "dense" size = "small" value ={password} onChange={ (e) => setpassword(e.target.value)}/>
                    <Typography className={classes.text2} color="primary" variant="subtitle1">
                        Forgot Password ?
                    </Typography>
                </CardContent>
                
                <CardActions>
                    <Button size="small" color="primary" fullWidth = {true} margin = "dense" variant = "contained" onClick = {handleLogin} disabled = {loading} >
                    Login 
                    </Button>
                </CardActions>
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                    Don't have an account ? <Link to="/signup" style={{textDecoration:'none'}}>Signup</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
    
  );
}
