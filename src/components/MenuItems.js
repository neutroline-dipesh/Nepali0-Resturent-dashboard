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
import MenuItemTabBar from "./MenuItemTabBar";
import images from "../assets/images/food.jpg";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import { data1 } from "./districts";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainDiv: {},
  root: {
    fontFamily: "Montserrat, sans-serif",

    width: "auto",
    height: "100vh",

    padding: "1rem",
    color: "#2f4050",

    display: "flex",
  },
  editButton: {
    height: "6vh",

    width: "12vw",
    justifyContent: "flex-start",
    position: "absolute",
    top: "18vh",
  },
  table: {
    width: "75vw",
    overflow: "auto",
  },
  mainDialog: {},
  dialog: {
    display: "flex",
    flexDirection: "column",
  },
  dialogTitle: {},
  dialogButton: {
    width: "11rem",
  },
  image: {
    width: "auto",
    height: "50px",
    borderRadius: "50%",
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
function createData(name, description, image, price) {
  return { name, description, image, price };
}

const rows = [
  createData("BUFF MOMO", "bff, onion , chilly, all", images, "Rs 120"),
  createData("Chicken MOMO", "Chicken, onion , chilly, all", images, "Rs 120"),
  createData("Steam Buff MOMO", "bff, onion , chilly, all", images, "Rs 120"),
  createData(
    "Steam Cicken MOMO",
    "Chicken, onion , chilly, all",
    images,
    "Rs 120"
  ),
  createData("BUff C MOMO", "bff, onion , chilly, all", images, "Rs 120"),
  createData(
    "Chicken C MOMO",
    "Chicken, onion , chilly, all",
    images,
    "Rs 120"
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
    <div className={classes.mainDiv}>
      <SideBar />
      <Grid container className={classes.root}>
        <h1>Menu Items</h1>

        <Button
          className={classes.editButton}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add Menu Items
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.mainDialog}
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Add/Update Menu Items
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <InputLabel id="demo-controlled-open-select-label">
                Menu Type
              </InputLabel>
              {data1.map((items) => (
                <MenuItem value={items.name}>{items.name}</MenuItem>
              ))}
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="description"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="image"
              type="file"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="price"
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

        <MenuItemTabBar />

        <TableContainer component={Paper} style={{ maxHeight: 370 }}>
          <Table
            className={classes.table}
            aria-label="customized table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img className={classes.image} src={row.image} />
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
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
    </div>
  );
};

export default Time;
