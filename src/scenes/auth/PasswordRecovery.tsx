import React from 'react';
import { AppError, AppAffirmative } from '../../api/core';
import { pwReset } from '../../api/user/pwReset';
import { Header, Container, Segment, Form, Loader, Dimmer } from 'semantic-ui-react';
import { redirectTo } from '@reach/router';
import config from '../../config'

type PasswordRecoveryProps = {
  email?: string;
  setLoggedIn?: (currentLoginStatus: boolean) => void;
  message?: React.ReactNode;
};

const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({ email = '', message, setLoggedIn}) => {
  const [currentEmail, setCurrentEmail] = React.useState(email);
  const [resetState, setResetState] = React.useState(message);

  const onClick = () => {
    setResetState(
      <Segment padded="very">
        <Dimmer active>
          <Loader indeterminate>Loading</Loader>
        </Dimmer>
      </Segment>,
    );

    pwReset(
      currentEmail,
      (_: AppAffirmative) => redirectTo('/confirm-password-reset'),
      (err: AppError) => setResetState(err.toMessage()),
      config.passwordRecoveryEndpoint,
    );
  };

  return (
    <Container>
      {resetState}
      <Segment padded="very">
        <Header>
          <Header.Content className="slimjoe">Reset password</Header.Content>
        </Header>

        <Form>
          <Form.Field>
            <label className="slimjoe">Email</label>
            <Form.Input placeholder="Email" value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <Form.Button
              primary
              disabled={currentEmail.length <= 0}
              className="slimjoe"
              type="submit"
              onClick={onClick}
            >
              Submit
            </Form.Button>
          </Form.Field>
        </Form>
      </Segment>
    </Container>
  );
};

export default PasswordRecovery;
