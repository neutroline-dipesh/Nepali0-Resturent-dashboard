import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import Grid from "@material-ui/core/Grid";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat, sans-serif",
    // backgroundColor: "green",
    width: "auto",
    height: "100vh",
    maxHeight: "100vh",
    float: "left",
    padding: "1rem",
    color: "#2f4050",
    alignTtems: "start",
    display: "flex",
    flexDirection: "column",
  },
  editButton: {
    height: "6vh",
    float: "left",
    width: "12vw",
  },
  table: {
    width: "78vw",
    overflow: "auto",
  },

  dialog: {
    display: "flex",
    flexDirection: "column",
  },
  dialogBackground: {},
  dialogTitle: {},
  dialogButton: {
    width: "8rem",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2f4050",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Time = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  //getting data from database
  const [data, setData] = useState([]);
  const fetchData = async () => {
    axios.get("http://localhost:4000/notice/").then((response) => {
      if (response.data) {
        setData(response.data.data);
      } else {
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //for post and update in database
  const [post, setPost] = useState([
    {
      id: "",
      noticeTitle: "",
      noticeBody: "",
    },
  ]);
  const { id, noticeTitle, noticeBody } = post;

  const editmodel = (id, noticeTitle, noticeBody) => {
    // console.log(id);
    setPost({
      id: id,
      noticeTitle: noticeTitle,
      noticeBody: noticeBody,
    });
  };

  const changeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  // console.log(post);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(post);
    if (post.id) {
      axios
        .patch("http://localhost:4000/notice/" + post.id, post, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          window.location.reload(false);
          // console.log("hello");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:4000/notice/", post, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          window.location.reload(false);
          // console.log("hello");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //delete in database
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:4000/notice/" + id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        window.location.reload(false);
        console.log("hello");
        console.log(response);
      });
  };

  //others
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");

  let loggedIn = true;
  if (token == null) {
    loggedIn = false;
  }

  if (loggedIn === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <SideBar />
      <Grid container className={classes.root}>
        <h1>Notice</h1>
        <br />
        <Button
          className={classes.editButton}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add Notice
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialogBackground}
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Add/Update Notice
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="noticeTitle"
              value={noticeTitle}
              onChange={changeHandler}
              label="noticeTitle"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="noticeBody"
              value={noticeBody}
              onChange={changeHandler}
              label="noticeBody"
              type="text"
            />
          </DialogContent>
          <DialogActions className={classes.dialogBackground}>
            <Button
              className={classes.dialogButton}
              variant="contained"
              color="primary"
              onClick={submitHandler}
            >
              {" "}
              Submit
            </Button>
            <Button
              className={classes.dialogButton}
              variant="contained"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <br />
        <TableContainer component={Paper} style={{ maxHeight: 450 }}>
          <Table
            className={classes.table}
            aria-label="customized table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Body</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="center">
                    {item.noticeTitle}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.noticeBody}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <EditIcon
                      onClick={() => {
                        editmodel(item._id, item.noticeTitle, item.noticeBody);
                        handleClickOpen();
                      }}
                    />
                    &nbsp; &nbsp; &nbsp;
                    <DeleteIcon onClick={() => handleDelete(item._id)} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default Time;
