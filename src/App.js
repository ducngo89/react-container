import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MicroClient from "./MicroClient";
import "./styles.css";

const App = () => (
  <Router>
    <div className="App">
      <h1>Client Hub</h1>
      <nav>
        <Link to="/">Dashboard</Link> | <Link to="/settings">Settings</Link>
      </nav>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <MicroClient
              clientName="dashboard-client"
              bundleHost="https://csb-8xths.vercel.app"
              {...props}
            />
          )}
        />
        <Route
          path="/settings"
          exact
          render={(props) => (
            <MicroClient
              clientName="settings-client"
              bundleHost="https://csb-4fvs5.vercel.app"
              {...props}
            />
          )}
        />
      </Switch>
    </div>
  </Router>
);

export default App;
