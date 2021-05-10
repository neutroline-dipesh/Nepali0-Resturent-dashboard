import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ContactsIcon from "@material-ui/icons/Contacts";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AlarmIcon from "@material-ui/icons/Alarm";
import NoteIcon from "@material-ui/icons/Note";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
export const SidebarData = [
  // {
  //   title: "Dashboard",
  //   icon: <DashboardIcon />,
  //   links: "/dashboard",
  // },

  {
    title: "MENU",
    icon: <MenuBookIcon />,
    links: "/menu",
  },
  {
    title: "MENU ITEMS",
    icon: <MenuBookIcon />,
    links: "/menuItem",
  },
  {
    title: "ABOUT",
    icon: <InfoIcon />,
    links: "/about",
  },
  {
    title: "TIME",
    icon: <AlarmIcon />,
    links: "/time",
  },
  {
    title: "NOTICE",
    icon: <NoteIcon />,
    links: "/notice",
  },
  {
    title: "CONTACT",
    icon: <ContactsIcon />,
    links: "/contact",
  },
  {
    title: "ACCOUNT",
    icon: <AccountCircleIcon />,
    links: "/user",
  },
  {
    title: "LOGOUT",
    icon: <ExitToAppIcon />,
    links: "/login",
  },
];
