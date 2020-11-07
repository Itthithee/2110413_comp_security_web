import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import { Login } from "./Login";
const authContext: any = createContext();
const useAuth = () => {
  return useContext(authContext);
};
const PrivateRoute = ({ children, ...rest }: any) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
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
        <Route path="*">
          <div>404 not found</div>
        </Route>
      </Switch>
    </Router>
  );
};
export default WebRouter;
