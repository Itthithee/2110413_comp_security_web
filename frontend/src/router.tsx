import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Login } from "./Login";
import { Home } from "./Home"
// const jwt = require('@types/jsonwebtoken');

const useAuth = async() => {
  const [cookies, setCookie] = useCookies(['Authentication']);
  if(cookies && cookies.Authentication){
    // const decrypt = await jwt.verify(cookies.Authentication, process.env.JWT_SECRET);
    console.log("accessed")
    return true
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

const FakeHome : React.FC = () => {
  const [cookies, setCookie,removeCookie] = useCookies(['token']);
  const onClick = () =>{
    removeCookie('token',{path:'/'})
  }
  return(<><button onClick={onClick}>logout</button></>)
}
const WebRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute path="/home">
          <Home/>
        </PrivateRoute>
        <Route path="*">
          <div>404 not found</div>
        </Route>
      </Switch>
    </Router>
  );
};
export default WebRouter;
