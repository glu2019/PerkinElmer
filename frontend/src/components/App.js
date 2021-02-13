import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import HomePage from "./home-page/HomePage";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                  <HomePage />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
