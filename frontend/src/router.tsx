import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Login } from "./Login";
import {Post} from "./Post"

const useAuth = () => {
  const [cookies, setCookie] = useCookies(['token']);
  if(cookies.token === "accessed"){
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
          <Post/>
        </PrivateRoute>
        <Route path="*">
          <div>404 not found</div>
        </Route>
      </Switch>
    </Router>
  );
};
export default WebRouter;
