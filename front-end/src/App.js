import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Predictor from './components/Predictor';
import './App.css';

import store from "./store";


const useStyles = makeStyles(theme => ({
  addressField: {
    width: 500,
    color: "white" 
  },
}));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
            <Router>
              <Route exact path={`/`} component={Predictor}/>
            </Router>
          </Provider>
    );
  };
}

export default App;
