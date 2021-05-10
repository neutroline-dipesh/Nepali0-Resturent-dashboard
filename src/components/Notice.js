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
    // background: "linear-gradient(349deg, #eee 30%, #fff 90%)",
    // backgroundColor: "#ffcfdf",
    // backgroundImage: "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)",
  },
  dialogBackground: {
    // background: "linear-gradient(349deg, #eee 30%, #fff 90%)",
  },
  dialogTitle: {
    // backgroundColor: "linear-gradient(349deg, #eee 30%, #fff 90%)",
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
function createData(noticeTitle, noticeBody) {
  return { noticeTitle, noticeBody };
}

const row = [
  createData("Covid-19", "Stay safe Stay Home"),
  createData("Covid-19", "Stay safe Stay Home"),
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
              label="noticeTitle"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="noticeBody"
              type="text"
            />
          </DialogContent>
          <DialogActions className={classes.dialogBackground}>
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
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Body</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.map((row) => (
                <StyledTableRow key={row.noticeTitle}>
                  <StyledTableCell align="center">
                    {row.noticeTitle}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.noticeBody}
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
