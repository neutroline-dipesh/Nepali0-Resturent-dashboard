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
import MenuItemTabBar from "./MenuItemTabBar";
import images from "../assets/images/food.jpg";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import { data1 } from "./districts";
import { Redirect } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  mainDiv: {},
  root: {
    fontFamily: "Montserrat, sans-serif",

    width: "auto",
    maxheight: "100vh",

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
  MainTable: {
    marginTop: "1.5rem",
  },
  table: {
    width: "75vw",
    overflow: "auto",
    // marginTop: "2rem",
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
    // borderRadius: "50%",
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
    axios.get("http://localhost:4000/menu/").then((response) => {
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
  const [selectedmenuItemData, setSelectedMenuItemData] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState([]);

  const handleDelete = (MenuItemid, _menuItemId) => {
    // console.log(id);
    const data = {
      _menuItem: MenuItemid,
    };

    // console.log(selectedMenuId);
    // console.log(data);
    // console.log(_menuItemId);
    // axios
    //   .delete("http://localhost:4000/menuItem/" + _menuItemId, {
    //     headers: {
    //       Authorization: localStorage.getItem("token"),
    //     },
    //   })
    //   .then((response) => {
    //     // window.location.reload(false);
    //     // console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    axios
      .delete("http://localhost:4000/menu/menuItem/" + selectedMenuId, {
        data: {
          _menuItem: MenuItemid,
        },
      })
      .then((response) => {
        console.log(response);
        // window.location.reload(false);
        // console.log("MenuItem Deleted");
        // console.log("MenuItem deleted from menu");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //for post and update in database
  const [option, setOption] = useState(null);
  const [updataData, setUpdataData] = useState([
    {
      id: "",
      menuItemId: "",
      name: "",
      description: "",
      image: "",
      price: "",
    },
  ]);

  function handleChange(event) {
    setOption(event.target.value);
  }
  const [pic, setPic] = useState(null);

  const fileSelectedHandler = (event) => {
    setPic(event.target.files[0]);
  };

  const editmodel = (id, menuItemId, name, description, image, price) => {
    // console.log(id);
    setUpdataData({
      id: id,

      menuItemId: menuItemId,
      name: name,
      description: description,
      image: image,
      price: price,
    });
    console.log(updataData);
  };

  const submitHandler = (e) => {
    var name = document.getElementById("name").value;
    var desc = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var menu = option;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", desc);
    formData.append("image", pic);

    e.preventDefault();
    // console.log(post);

    axios
      .post("http://localhost:4000/menuItem/", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        var id = response.data.data._id;

        const data = {
          _menuItem: id,
        };
        // console.log("meny type :", menu);
        // console.log("menuItem:", data);
        console.log(data);
        return axios
          .post("http://localhost:4000/menu/menuItem/" + menu, data, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((response) => {
            // window.location.reload(false);
            console.log("menu Item added");
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    // if (post.id) {
    //   axios
    //     .patch("http://localhost:4000/time/" + post.id, post, {
    //       headers: {
    //         Authorization: localStorage.getItem("token"),
    //       },
    //     })
    //     .then((response) => {
    //       window.location.reload(false);
    //       // console.log("hello");
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {

    // }
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
              id="menu"
              name="menu"
              value={selectedMenuId}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <InputLabel id="demo-controlled-open-select-label">
                Menu Type
              </InputLabel>
              {data.map((items) => (
                <MenuItem value={items._id}>{items.menu}</MenuItem>
              ))}
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              value={updataData.name}
              // onChange={changeHandler}
              label="name"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              value={updataData.description}
              // onChange={changeHandler}
              label="description"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              id="image"
              name="image"
              // value={updataData.image}
              onChange={fileSelectedHandler}
              label="image"
              type="file"
            />
            <TextField
              autoFocus
              margin="dense"
              id="price"
              name="price"
              value={updataData.price}
              // onChange={changeHandler}
              label="price"
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

        <MenuItemTabBar
          menuItemData={(data) => setSelectedMenuItemData(data)}
          menuId={(data) => setSelectedMenuId(data)}
        />

        <TableContainer
          className={classes.MainTable}
          component={Paper}
          style={{ maxHeight: 370 }}
        >
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
              {selectedmenuItemData.map((item) => (
                <StyledTableRow key={item._menuItem._id}>
                  <StyledTableCell align="center">
                    {item._menuItem.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item._menuItem.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img className={classes.image} src={item._menuItem.image} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Rs {item._menuItem.price}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon
                      onClick={() => {
                        editmodel(
                          item._id,
                          item._menuItem._id,
                          item._menuItem.name,
                          item._menuItem.description,
                          item._menuItem.image,
                          item._menuItem.price
                        );
                        handleClickOpen();
                      }}
                    />
                    &nbsp; &nbsp; &nbsp;
                    <DeleteIcon
                      onClick={() => handleDelete(item._id, item._menuItem._id)}
                    />
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
