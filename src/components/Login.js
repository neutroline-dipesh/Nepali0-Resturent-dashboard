import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import Image from "../assets/images/wall.jpg";
import logo from "../assets/images/logo.png";

import axios from "axios";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    display: "flex",
    alignContent: "center",
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    height: "50vh",
    width: "23%",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: "16px",
    borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
    borderTop: " 1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 16px  rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
  logo: {
    width: "35%",
    align: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  field: {
    width: "90%",
    borderColor: "#2f4050",
  },
  button: {
    width: "90%",
    backgroundColor: "#2f4050",
    color: "white",
  },
}));
const Login = () => {
  const classes = useStyles();

  //for post in database
  const token = localStorage.getItem("token");
  let loggedIn = true;
  if (token == null) {
    loggedIn = false;
  }
  const [post, setPost] = useState([
    {
      email: "",
      password: "",
      error: "",
      loggedIn,
    },
  ]);
  const { email, password } = post;
  const changeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  console.log(post);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/user/login/", post)
      .then((response) => {
        if (response.data) {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          setPost({
            loggedIn: true,
          });
          console.log("login");
        } else {
          setPost({
            error: "username or password does not match",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (post.loggedIn) {
    return <Redirect to="/menu" />;
  }

  return (
    <Grid container className={classes.root}>
      <form className={classes.form} onSubmit={submitHandler} method="post">
        <img className={classes.logo} src={logo} />

        <TextField
          className={classes.field}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          value={email}
          onChange={changeHandler}
          name="email"
          placeholder="Enter email"
          autoFocus
        />
        <div>&nbsp;</div>
        <TextField
          className={classes.field}
          id="outlined-basic"
          label="password"
          variant="outlined"
          type="password"
          value={password}
          onChange={changeHandler}
          placeholder="Enter password"
          name="password"
        />
        <div>&nbsp;</div>

        <Button className={classes.button} type="submit" variant="contained">
          Log In
        </Button>
      </form>
    </Grid>
  );
};

export default Login;
