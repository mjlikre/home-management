import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';


// Import Containers
import App from './containers/App';

import SignOut from "./containers/Signout";
import SignIn from "./containers/Login";
import Welcome from "./containers/WelcomePage";
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';

// configure redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token')}
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Route path="/" render = {App}/>

        <Route path='/home' component={Welcome}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/signout' component={SignOut}/>

    </Router>
  </Provider>
  , document.getElementById('root'));
