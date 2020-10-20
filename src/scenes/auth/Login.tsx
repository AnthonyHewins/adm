import React from 'react';
import { List, Message, Header, Container, Segment, Form, Loader } from 'semantic-ui-react';
import { Link } from '@reach/router';

import login from 'services/user/login';

type LoginProps = {
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
