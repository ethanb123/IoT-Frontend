import React from "react";
import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HelpPage from "views/HelpPage";
import DevicePage from "views/DevicesPage";
import Data from "views/Data";
import GatewayPage from "views/GatewayPage";
import HomePage from "views/HomePage";

/* 
      ^- ToDo Landing page -^ 
  -stats:
    -number of devices
    -number of gateways
    -connection types:
      -zigbee, wifi, etc

        ^- ToDo Devices -^
 -dynamically changing drop down menu
 
      ^- ToDo Gateways -^   
      
      ^- ToDo Data -^ 
      -edit button (edit items directly)   
      -save
      -search function *later*

      ^- ToDo Help -^ 
      -keep up to date with changes
      -pictures *later*  
      
      ^-Overall-^
      -dark theme

 
*/

function App() {
  return (
    <div className = "backgroundcolorchange">
      <Router>
        <div>
          <NavigationBar />
          <Switch>

            <Route exact path="/">
              <HomePage />
            </Route>

            <Route path="/devicepage">
              <DevicePage />
            </Route>

            <Route path="/gatewaypage">
              <GatewayPage />
            </Route> 

            <Route path="/data">
              <Data />
            </Route>

            <Route path="/helppage">
              <HelpPage />
            </Route>

          </Switch>
        </div>
      </Router>
    </div >
  );
}

export default App;
