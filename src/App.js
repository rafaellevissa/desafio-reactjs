import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/user/addUser";
import AddOrder from "./components/order/addOrder";
import Order from "./components/order/order";
import User from "./components/user/user";
import UserList from "./components/user/listUser";
import OrderList from "./components/order/listOrder";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Desafio
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/orders"} className="nav-link">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addUser"} className="nav-link">
                AddUser
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addOrder"} className="nav-link">
                AddOrder
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={UserList} />
            <Route exact path={["/orders"]} component={OrderList} />
            <Route exact path="/addUser" component={AddUser} />
            <Route exact path="/addOrder" component={AddOrder} />
            <Route path="/user/:id" component={User} />
            <Route path="/order/:id" component={Order} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
