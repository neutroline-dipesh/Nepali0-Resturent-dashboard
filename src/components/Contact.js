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
    axios.get("http://localhost:4000/contact/").then((response) => {
      if (response.data) {
        setData(response.data.data);
      } else {
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //delete in database
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:4000/contact/" + id, {
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
        <h1>Contact</h1>
        <br />

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
                <StyledTableCell align="center">Subject</StyledTableCell>
                <StyledTableCell align="center">Message</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.subject}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.message}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(item.date).format("LL")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
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
