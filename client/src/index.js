import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

// Import Containers
import Cycle from "./containers/Cycle";
import SignOut from "./containers/Signout";
import SignIn from "./containers/Login";
import Sales from "./containers/Sales";
import Client from "./containers/Client";
import Main from "./containers/Main";
import Inventory from "./containers/Inventory"
import "bootstrap/dist/css/bootstrap.min.css";
import "./styling/main.css"

import reducers from "./reducers";


// configure redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("token") },
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Main} />
      <Route path="/signin" component={SignIn} />
      <Route path="/sales" component={Sales} />
      <Route path="/signout" component={SignOut} />
      <Route path="/specifics" component={Cycle} />
      <Route path="/client" component={Client} />
      <Route path="/inventory" component = {Inventory}/>
      <Redirect from="/main" to="/" />
    </Router>
  </Provider>,
  document.getElementById("root")
);
