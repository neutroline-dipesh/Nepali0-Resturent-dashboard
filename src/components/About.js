import React from "react";
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

import { data } from "./country";
import { district } from "./district";
import InputLabel from "@material-ui/core/InputLabel";

import { Redirect } from "react-router-dom";

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
function createData(
  companyName,
  city,
  district,
  country,
  phone,
  email,
  facebookUrl,
  instaUrl,
  youtubeUrl
) {
  return {
    companyName,
    city,
    district,
    country,
    phone,
    email,
    facebookUrl,
    instaUrl,
    youtubeUrl,
  };
}

const rows = [
  createData(
    "Treat Resturent",
    "kathmandu",
    "kathmandu",
    "Nepal",
    "9816940668",
    "reat@gmail.com",
    "https://www.facebook.com/",
    "https://www.insta.com/",
    "https://www.youtube.com/"
  ),
];

const Time = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

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
              label="Company Name"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="City"
              type="text"
            />
            <br />

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <InputLabel id="demo-controlled-open-select-label">
                District
              </InputLabel>
              {district.map((items) => (
                <MenuItem value={items.name}>{items.name}</MenuItem>
              ))}
            </Select>
            <br />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <InputLabel id="demo-controlled-open-select-label">
                Country
              </InputLabel>
              {data.map((items) => (
                <MenuItem value={items.name}>{items.name}</MenuItem>
              ))}
            </Select>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Phone"
              type="number"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Facebook URL"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Insta URL"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Youtube URL"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.dialogButton}
              variant="contained"
              color="primary"
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
              {rows.map((row) => (
                <StyledTableRow key={row.companyName}>
                  <StyledTableCell align="center">
                    {row.companyName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.city}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.district}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.country}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.phone}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.facebookUrl}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.instaUrl}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.youtubeUrl}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon onClick={handleClickOpen} />
                    &nbsp; &nbsp; &nbsp;
                    <DeleteIcon />
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
