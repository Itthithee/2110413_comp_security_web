import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { useCookies } from "react-cookie";
import { Login } from "./Login";
import { Home } from "./Home";
import { StateProvider, StateContext, User, UserDispatch } from "./StateKeeper";
import * as jwt from "jsonwebtoken";
import { computeStyles } from "@popperjs/core";

const useAuth = () => {
  const { state, setState } = useContext(StateContext) as UserDispatch;
  const [cookies, setCookie] = useCookies(["Authentication"]);
  if (cookies && cookies.Authentication) {
    const decrypt = jwt.decode(cookies.Authentication);
    let { username, userId, isAdmin } = decrypt as User;
    if (username && userId) {
      console.log(decrypt);
      return true;
    }
  }
  return false;
};
const PrivateRoute = ({ children, ...rest }: any) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const FakeHome: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const onClick = () => {
    removeCookie("token", { path: "/" });
  };
  return (
    <>
      <button onClick={onClick}>logout</button>
    </>
  );
};
const WebRouter: React.FC = () => {
  let auth = useAuth();
  return (
    <StateProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            {auth?<Redirect
            to="/home"
          />:<Login />}
          </Route>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <Route path="*">
            <div>404 not found</div>
          </Route>
        </Switch>
      </Router>
    </StateProvider>
  );
};
export default WebRouter;
