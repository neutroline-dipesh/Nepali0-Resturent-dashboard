import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Redirect } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    backgroundColor: "blue",
    height: "7vh",
    marginTop: "5rem",
  },
}));
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonAuto(props) {
  //getting data from database
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

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

  const handleSelect = async (e) => {
    axios.get("http://localhost:4000/menu/" + e).then((response) => {
      if (response.data) {
        setData1(response.data.data.menuItems);
        setData2(response.data.data._id);
      } else {
      }
    });
    props.menuItemData(data1);
    props.menuId(data2);

    // console.log(data1);
  };
  // useEffect(() => {
  //   handleSelect();
  // }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          className={classes.TabBar}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs examle"
        >
          {data.map((item) => (
            <Tab
              label={item.menu}
              key={item._id}
              onClick={() => handleSelect(item._id)}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}
