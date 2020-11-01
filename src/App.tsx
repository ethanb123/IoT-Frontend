import React from "react";
import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Devices from "devices/Devices";
import HelpPage from "Help/HelpPage"

//comment

function App() {
  return (
    <div>
      <Router>
        <div>
          <NavigationBar />

          <Switch>
            <Route path="/devices">
              <Devices />
            </Route>

            <Route path="/help">
              <HelpPage />
            </Route>

          </Switch>
        </div>
      </Router>
    </div >
  );
}

export default App;
