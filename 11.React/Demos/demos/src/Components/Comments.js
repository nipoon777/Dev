import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

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

const Backdrop = styled("div")`
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
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Comments({ postId }) {
  const [comments, setComments] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [open, setOpen] = useState(false);
  
    const [name, setname] = useState(null);
    const [email, setemail] = useState(null);
    const [body, setbody] = useState(null);




  // console.log(postId);

  useEffect(async () => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const data = await resp.json();
    setComments(data);
    console.log(data);
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const addComment = () =>{
        const nId = Object.keys(comments).length;
      const newComment = {
          postId : postId,
          id : nId + 1,
          name : name,
          email : email,
          body : body
      }
      const uComment = comments;
      uComment.push(newComment);
      setComments(uComment);
      handleClose();
  }

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
          Comments:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {comments &&
          comments.map((comment, index) => (
            <AccordionDetails key={index}>
              <Typography>
                <b>Name :</b> {comment.name}
              </Typography>
              <Typography>
                <b>Comment :</b> {comment.body}
              </Typography>
            </AccordionDetails>
          ))}
      </AccordionDetails>
      <Divider />
      <Button
        variant="contained"
        sx={{ marginLeft: "25px", marginBottom: "20px", marginTop: "10px" }}
        onClick={handleOpen}
      >
        Add Comment
      </Button>

      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style} component="form" noValidate autoComplete="off">
          <TextField
            required
            id="outlined-required"
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            onBlur = {(e) => setname(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            type = "email"
            onBlur = {(e) => setemail(e.target.value)}
          />

        <TextField
          required
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={4}
          fullWidth
          onBlur = {(e) => setbody(e.target.value)}
        />

          <Button
            variant="contained"
            sx={{  marginBottom: "20px", marginTop: "10px" }}
            onClick={addComment}
          >
            Add Comment
          </Button>
        </Box>
      </StyledModal>
    </Accordion>
  );
}

export default Comments;
