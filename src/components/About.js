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

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import { countrys } from "./countrys";
import { data1 } from "./districts";
import InputLabel from "@material-ui/core/InputLabel";

import { Redirect } from "react-router-dom";
import axios from "axios";

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
  addButton: {
    height: "6vh",
    float: "left",
    width: "15vw",
  },
  table: {
    overflow: "auto",
    width: "450",
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
    axios.get("http://localhost:4000/about/").then((response) => {
      if (response.data) {
        setData(response.data.data);
      } else {
      }
    });
  };

  //for post and update in database
  const [post, setPost] = useState([
    {
      id: "",
      companyName: "",
      city: "",
      district: "",
      country: "",
      phone: "",
      email: "",
      facebookUrl: "",
      instaUrl: "",
      youtubeUrl: "",
    },
  ]);
  const {
    id,
    companyName,
    city,
    district,
    country,
    phone,
    email,
    facebookUrl,
    instaUrl,
    youtubeUrl,
  } = post;

  const editmodel = (
    id,
    companyName,
    city,
    district,
    country,
    phone,
    email,
    facebookUrl,
    instaUrl,
    youtubeUrl
  ) => {
    // console.log(id);
    setPost({
      id: id,
      companyName: companyName,
      city: city,
      district: district,
      country: country,
      phone: phone,
      email: email,
      facebookUrl: facebookUrl,
      instaUrl: instaUrl,
      youtubeUrl: youtubeUrl,
    });
  };

  const changeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  // console.log(post);

  const submitHandler = (e) => {
    e.preventDefault();
    if (post.id) {
      axios
        .patch("http://localhost:4000/about/" + post.id, post, {
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
        .post("http://localhost:4000/about/", post, {
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
      .delete("http://localhost:4000/about/" + id, {
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

  useEffect(() => {
    fetchData();
  }, []);

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
        <h1>About</h1>
        <br />
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add Information
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Add/Update Information
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="companyName"
              value={companyName}
              onChange={changeHandler}
              label="Company Name"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="city"
              value={city}
              onChange={changeHandler}
              label="City"
              type="text"
            />
            <br />

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              name="district"
              value={district}
              onChange={changeHandler}
            >
              <InputLabel id="demo-controlled-open-select-label">
                District
              </InputLabel>
              {data1.map((items) => (
                <MenuItem value={items.name}>{items.name}</MenuItem>
              ))}
            </Select>
            <br />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              name="country"
              value={country}
              onChange={changeHandler}
            >
              <InputLabel id="demo-controlled-open-select-label">
                Country
              </InputLabel>
              {countrys.map((items) => (
                <MenuItem value={items.name}>{items.name}</MenuItem>
              ))}
            </Select>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="phone"
              value={phone}
              onChange={changeHandler}
              label="Phone"
              type="number"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="email"
              value={email}
              onChange={changeHandler}
              label="Email"
              type="email"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="facebookUrl"
              value={facebookUrl}
              onChange={changeHandler}
              label="Facebook URL"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="instaUrl"
              value={instaUrl}
              onChange={changeHandler}
              label="Insta URL"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="youtubeUrl"
              value={youtubeUrl}
              onChange={changeHandler}
              label="Youtube URL"
              type="text"
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
        <TableContainer
          component={Paper}
          style={{ maxHeight: 450, width: 1070 }}
        >
          <Table
            className={classes.table}
            aria-label="customized table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Company Name</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">District</StyledTableCell>
                <StyledTableCell align="center">Country</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center">Gmail</StyledTableCell>
                <StyledTableCell align="center">Facebook URL</StyledTableCell>
                <StyledTableCell align="center">Insta URL</StyledTableCell>
                <StyledTableCell align="center">Youtube URL</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="center">
                    {item.companyName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.city}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.district}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.country}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.phone}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.facebookUrl}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.instaUrl}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.youtubeUrl}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon
                      onClick={() => {
                        editmodel(
                          item._id,
                          item.companyName,
                          item.city,
                          item.district,
                          item.country,
                          item.phone,
                          item.email,
                          item.facebookUrl,
                          item.instaUrl,
                          item.youtubeUrl
                        );
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
