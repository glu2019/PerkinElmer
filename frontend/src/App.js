import './App.css';
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import HomePage from "./components/home-page/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
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
