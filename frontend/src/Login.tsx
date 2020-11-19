import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import {
  Grid,
  Button,
  Form,
  Card,
  Transition,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {StateContext,User,UserDispatch} from "./StateKeeper";
import { useCookies } from "react-cookie";
import * as jwt from "jsonwebtoken";

axios.defaults.withCredentials = true
const Loading: React.FC = ({ loading }: any) => {
  if (loading) {
    return null;
  } else {
    return (
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }
};
export const Login: React.FC = () => {
  const a = useContext(StateContext)
  const Label = styled.label`
    text-align: left;
  `;
  const MyGrid = styled(Grid)`
    padding-top: 10% !important;
  `;
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const {state,setState} = useContext(StateContext) as UserDispatch;
  const [cookies ,setCookie] = useCookies(["Authentication"])

  const signIn = async() => {
    setLoading(true);
    try{
      if (username.current === null) {
        // console.log(username.current.value);
        return
      }
      if (password.current === null) {
        return
      }
      {
        let data ={ username: username?.current?.value, password: password?.current?.value }
        const result = await axios({
          method: "post",
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: "auth/login",
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(cookies && cookies.Authentication ){
          const decrypt = jwt.decode(cookies.Authentication);
          let {username,userId,isAdmin} = decrypt as User
          console.log(decrypt)
          if(username && userId){
            setState(decrypt as User)
          }
        }
        console.log(result)
      }
      
      // let cookiesOptions: object = { path: "/" };
      // if (process.env.NODE_ENV === "production") {
      //   cookiesOptions = { ...cookiesOptions, secure: true };
      // }
      // setCookie("token", "accessed", cookiesOptions);
      setLoginSuccess(true)
    } catch(e){
      alert("wrong username or password")
    }
    setLoading(false);
  };
  useEffect(() => {}, [loading]);
  return (
    <>
      {loginSuccess?<Redirect to="/home" /> : null }
      {loading ? (
        <Dimmer inverted active>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : null}
      <MyGrid verticalAlign="middle" centered columns={2}>
        <Grid.Row centered>
          <Transition
            mountOnShow
            transitionOnMount
            animation="fade down"
            duration={600}
          >
            <Card>
              <Card.Content>
                <Card.Header>Sign In</Card.Header>
                <Form onSubmit={signIn}>
                  <Form.Field>
                    <Label>Username</Label>
                    <input placeholder="Username" ref={username} />
                  </Form.Field>
                  <Form.Field>
                    <Label>Password</Label>
                    <input
                      placeholder="Password"
                      type="password"
                      ref={password}
                    />
                  </Form.Field>
                  <Button type="submit">Submit</Button>
                </Form>
              </Card.Content>
            </Card>
          </Transition>
        </Grid.Row>
      </MyGrid>
    </>
  );
};
