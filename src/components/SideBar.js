import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SidebarData } from "./SidebarData";
import adminPic from "../assets/images/square.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "225px",
    backgroundColor: "#2f4050",
    float: "left",
  },
  adminPic: {
    width: "35%",
    borderRadius: "50%",
    marginLeft: "4rem",
    marginTop: "1rem",
  },
  welcome: {
    color: "#ccccb3",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  SideBarlist: {
    height: "auto",
    width: "100%",
    padding: "0",
  },
  Navigation: {
    color: "white",
    height: "6vh",
    backgroundColor: "#007399",
    flex: "30%",
    display: "grid",
    placeItems: "center",
  },
  SideBarListRow: {
    width: "100%",
    height: "60px",
    listStyleType: "none",
    margin: "0%",
    display: "flex",
    flexDirection: "row",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#293646",
    },
    "& #active": {
      backgroundColor: "#293646",
    },
  },

  SideBarListiIcon: {
    flex: "35%",
    display: "grid",
    placeItems: "center",
  },
  SideBarListiTitle: {
    flex: "70%",
  },
}));
const SideBar = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <ul className={classes.SideBarlist}>
        <div>
          <img className={classes.adminPic} src={adminPic} />
        </div>
        <div className={classes.welcome}>WELCOME , Dipesh Shrestha</div>
        <div className={classes.Navigation}>Navigation</div>
        {SidebarData.map((item, key) => {
          return (
            <li
              className={classes.SideBarListRow}
              key={key}
              id="active"
              onClick={() => {
                window.location.pathname = item.links;
              }}
            >
              <div className={classes.SideBarListiIcon}> {item.icon}</div>
              <div className={classes.SideBarListiTitle}>{item.title}</div>
            </li>
          );
        })}
      </ul>
    </Grid>
  );
};

export default SideBar;
