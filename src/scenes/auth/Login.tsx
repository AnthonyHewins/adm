import React from 'react';
import { Link } from '@reach/router';
import { AppError } from '../../api/core';
import { login } from '../../api/user/login';
import { JwtResponse } from '../../api/user/jwt';
import { List, Message, Header, Container, Segment, Form, Loader } from 'semantic-ui-react';

export interface LoginProps {
  endpoint?: string;

  email?: string;
  password?: string;

  setLoggedIn?: (currentLoginStatus: boolean) => void;

  message?: React.ReactNode;
}

const Login: React.FC<LoginProps> = ({
  email = '',
  password = '',
  message = undefined,
  setLoggedIn = (_: boolean) => null,
  endpoint = '/api/v1/auth/login',
}) => {
  const [currentEmail, setCurrentEmail] = React.useState(email);
  const [currentPassword, setCurrentPassword] = React.useState(password);
  const [msg, setMsg] = React.useState(message);

  const onClick = () => {
    setMsg(
      <Segment>
        <Loader>Loading</Loader>
      </Segment>,
    );

    login(
      currentEmail,
      currentPassword,
      (jwt: JwtResponse) => {
        console.log('Logged in, expiring at ' + jwt.expire);
        sessionStorage.setItem('jwt-token', jwt.token);
        sessionStorage.setItem('jwt-expiration', jwt.expire);

        setMsg(
          <Message success>
            <Message.Header>Successfully logged in.</Message.Header>
            Got JWT token at {new Date().toUTCString()}
          </Message>,
        );
        setLoggedIn(true);
      },
      (err: AppError) => setMsg(err.toMessage()),
      endpoint,
    );
  };

  const alreadyLoggedIn =
    sessionStorage.getItem('jwt-token') !== null && sessionStorage.getItem('jwt-expiration') !== null;

  const loginButton = (
    <Form.Button primary disabled={alreadyLoggedIn} className="slimjoe" type="submit" onClick={onClick}>
      Submit
    </Form.Button>
  );

  return (
    <Container>
      {msg}
      <Segment padded="very">
        <Header>
          <Header.Content className="slimjoe">Login</Header.Content>
        </Header>

        <Form>
          <Form.Field>
            <label className="slimjoe">Email</label>
            <Form.Input placeholder="Email" value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label className="slimjoe">Password</label>
            <Form.Input
              type="password"
              placeholder="Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            {loginButton}
            {alreadyLoggedIn && <p>Already logged in.</p>}
          </Form.Field>
        </Form>

        <List>
          <List.Item>
            <Link to="/register">Register</Link>
          </List.Item>
          <List.Item>
            <Link to="/reset-password">Forgot password</Link>
          </List.Item>
        </List>
      </Segment>
    </Container>
  );
};

export default Login;
