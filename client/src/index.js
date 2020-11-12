import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

// Import Containers
import App from "./containers/App";
import Cycle from "./containers/Cycle";
import SignOut from "./containers/Signout";
import SignIn from "./containers/Login";
import Daily from "./containers/Daily";
import Client from "./containers/Client";
// import Specifics from "./containers/Specifics"
import Main from "./containers/Main";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <Route path="/" render={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/daily" component={Daily} />
      <Route path="/signout" component={SignOut} />
      <Route path="/specifics" component={Cycle} />
      <Route path="/client" component={Client} />
      {/* <Route path="/cycle" component={Cycle}/> */}
      <Route path="/main" component={Main} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
