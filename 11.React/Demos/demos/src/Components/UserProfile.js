import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import PersonIcon from "@mui/icons-material/Person";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider } from "@mui/material";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Comments from "./Comments";
import ModalUnstyled from '@mui/base/ModalUnstyled';
import TextField from '@mui/material/TextField';
import Albums from "./Albums";



const StyledModal = styled(ModalUnstyled)`
position: fixed;
z-index: 1300;
right: 0;
bottom: 0;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function UserProfile(props) {
  const { userId } = useParams();

  const [userData, setUserData] = useState(null);
  const [expanded, setExpanded] = useState(null);


  const [postData, setPosts] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle ] = useState(null);
  const [content, setcontent] = useState(null);
  const [updateUD, setupdateUD] = useState(null);
  const [updatepostID, setupdatepostID] = useState(null);

  const handleOpen = (postU) => {
    setOpen(true);
    setTitle(postU.title);
    setcontent(postU.body);
    setupdateUD(postU.userId);
    setupdatepostID(postU.id);

  } 
  const handleClose = () => setOpen(false);

  useEffect( async() => {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const data = await resp.json();
    // console.log(data);
    setPosts(data);
    console.log(postData);
  }, [])

  

  useEffect(async () => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const data = await resp.json();

    console.log(data);
    setUserData(data);
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const deletePost = (postId) => {
    setPosts( postData.filter( post => post.id !== postId));
  }

  const updatePost = () => {
    const updatedPost = {
      "userId": updateUD,
      "id": updatepostID,
      "title": title,
      "body": content
  }
    setPosts ( postData.map( (post) => post.id === updatepostID ? updatedPost : post ) ) ;
    handleClose();
  }
  // const [key, setKey ] = useState(null);

  return (
    <>
      {/* User Profile */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 345,
            minWidth: 450,

            marginTop: "10px",
            marginBottom : "10px"
          }}
          // key={user.id}
        >
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 150,
              backgroundColor: "#c7ecee",
            }}
          >
            <PersonIcon sx={{ fontSize: "50px" }} />
          </CardMedia>
          <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableBody>
                  <TableRow>
                    <TableCell sx = {{fontWeight :"bold"}}component="th" scope="row">
                      Name
                    </TableCell>
                    <TableCell align="left">{userData && userData.name}</TableCell>
    
                  </TableRow>
                  <TableRow>
                    <TableCell sx = {{fontWeight :"bold"}}component="th" scope="row">
                      Username
                    </TableCell>
                    <TableCell align="left">{userData && userData.username}</TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell sx = {{fontWeight :"bold"}}component="th" scope="row">
                      Email
                    </TableCell>
                    <TableCell align="left">{userData && userData.email}</TableCell>
    
                  </TableRow>
                  <TableRow>
                    <TableCell sx = {{fontWeight :"bold"}}component="th" scope="row">
                      Phone Number
                    </TableCell>
                    <TableCell align="left">{userData && userData.phone}</TableCell>
    
                  </TableRow>
                  <TableRow>
                    <TableCell sx = {{fontWeight :"bold"}}component="th" scope="row">
                      Website
                    </TableCell>
                    <TableCell align="left">{userData && userData.website}</TableCell>
    
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
      <Divider/>
      {/* Posts */}

      <Box>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{fontWeight :"bold", fontSize : "24px"}}>Posts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
                {
                    postData && postData.map((post, index) =>(
                        <Accordion key = {index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          
                        >
                          <Typography><b>Title :</b> {post.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <b>Content :</b> {post.body}
                          </Typography>
                          <Comments postId = {post.id} />
                        </AccordionDetails>
                          {/* Edit Handling Open New Modal */}
                          <Stack direction="row" sx ={{marginLeft :"25px", marginBottom : "20px"}}spacing={2}>
                            <Button variant="outlined" color="success" onClick ={()=>{handleOpen(post)}}>
                            Edit
                          </Button>

                          <StyledModal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={open}
                            onClose={handleClose}
                            BackdropComponent={Backdrop}
                            key = {index}
                          >
                            <Box sx={style}
                              component="form"
                              noValidate
                              autoComplete="off"
                            >
                            <TextField
                              required
                              id="outlined-required"
                              label="Title"
                              defaultValue = {title}
                              name = "title"
                              fullWidth
                              margin="normal"
                              onBlur = {(e) => setTitle(e.target.value)}
                            />
                            <TextField
                              required
                              id="outlined-required"
                              label="Content"
                              defaultValue= {content}
                              name = "content"
                              fullWidth
                              margin="normal"
                              onBlur = {(e) => setcontent(e.target.value)}
                            />
                            
                            
                            

                            <Button variant="outlined" color="success" onClick={updatePost}>
                              Edit
                            </Button>
                              
                            

                            </Box>
                          </StyledModal>

                          {/* Delete Button Implementation */}
                          <Button variant="outlined" color="error" onClick={()=> deletePost(post.id)}>
                            Delete
                          </Button>

                        </Stack> 
                        
                        </Accordion>
                      
        
                    ))
                }
          
        </AccordionDetails>
      </Accordion>

      {/* Albums */}
      
        <Albums userId = {userId} />
        
      
    </Box>

      
    </>
  );
}

export default UserProfile;
