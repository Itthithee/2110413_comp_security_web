import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import { Login } from "./Login";
const WebRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <div>aaaa</div>
        </Route>
      </Switch>
    </Router>
  );
};
export default WebRouter;
