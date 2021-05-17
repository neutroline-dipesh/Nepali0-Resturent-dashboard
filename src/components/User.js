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
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat, sans-serif",

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
    axios.get("http://localhost:4000/user/").then((response) => {
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
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    conformpassword: "",
  });
  const { name, email, password, conformpassword } = userData;

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userData);
    axios
      .post("http://localhost:4000/user/signup/", userData)
      .then((response) => {
        window.location.reload(false);
        // console.log("hello");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete in database
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:4000/user/" + id, {
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
        <h1>Account</h1>
        <br />
        <Button
          className={classes.editButton}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Create User
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Create/Update User
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              value={name}
              onChange={changeHandler}
              label="Name"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="email"
              value={email}
              onChange={changeHandler}
              label="Email"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="password"
              value={password}
              onChange={changeHandler}
              label="Password"
              type="password"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="conformpassword"
              value={conformpassword}
              onChange={changeHandler}
              label="Confirm Password"
              type="password"
            />
          </DialogContent>
          <DialogActions>
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
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Created Date</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(item.createAt).format("LL")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon onClick={handleClickOpen} />
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
