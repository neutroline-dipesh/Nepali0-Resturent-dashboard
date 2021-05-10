import Login from "./components/Login";
import "./App.css";
import SideBar from "./components/SideBar";
import Time from "./components/Time";
import Notice from "./components/Notice";
import Contact from "./components/Contact";
import Menu from "./components/Menu";
import MenuItem from "./components/MenuItems";
import MenuItemTabBar from "./components/MenuItemTabBar";
import About from "./components/About";
import Account from "./components/User";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Error from "./components/Error";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />

        <Route exact path="/about" component={About} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/menuItem" component={MenuItem} />
        <Route exact path="/time" component={Time} />
        <Route exact path="/notice" component={Notice} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/user" component={Account} />

        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
