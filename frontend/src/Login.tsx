import React, { useState, useEffect, useRef } from "react";
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
  const Label = styled.label`
    text-align: left;
  `;
  const MyGrid = styled(Grid)`
    padding-top: 10% !important;
  `;
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const [loading,setLoading] = useState(false)
  const signIn = () => {
    setLoading(true);
    if(username.current!==null){
      console.log(username.current.value)
    }
    if(password.current!==null){
      password.current.value=""
    }
  };
  useEffect(()=>{}, [loading])
  return (
    <>
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
                    <input placeholder="Username" ref={username}/>
                  </Form.Field>
                  <Form.Field>
                    <Label>Password</Label>
                    <input placeholder="Password" type="password" ref={password}/>
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
