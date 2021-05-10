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
    // backgroundColor: "#ffcfdf",
    // backgroundImage: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
  },
  dialogTitle: {
    // backgroundColor: "#ffcfdf",
    // backgroundImage: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
  },
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
function createData(days, startTime, endTime) {
  return { days, startTime, endTime };
}

const rows = [
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
  createData("sun-friday", "6:00am", "5:00pm"),
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
  return (
    <>
      <SideBar />
      <Grid container className={classes.root}>
        <h1>Time</h1>
        <br />
        <Button
          className={classes.editButton}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add Time
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Add/Update Time
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Days"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Start Time"
              type="time"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="End Time"
              type="time"
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
        <TableContainer component={Paper} style={{ maxHeight: 450 }}>
          <Table
            className={classes.table}
            aria-label="customized table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Days</StyledTableCell>
                <StyledTableCell align="center">Start Time</StyledTableCell>
                <StyledTableCell align="center">End Time</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.days}>
                  <StyledTableCell align="center">{row.days}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.startTime}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.endTime}
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
