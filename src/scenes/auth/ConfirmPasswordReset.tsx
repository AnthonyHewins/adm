import React from 'react';
import { List, Container, Segment, Form, Header, Message } from 'semantic-ui-react';
import { confirmPwReset } from '../../api/user/confirmPwReset';
import { AppAffirmative, AppError } from '../../api/core';
import ErrorCheck from '../../components/ErrorCheck';
import { useHistory } from 'react-router-dom';
import config from '../../config'

type ConfirmPasswordResetProps = {
  message?: React.ReactNode;

  token?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
};

enum formErrors {
  weakPw = 0x1,
  pwMismatch = 0x2,
  noToken = 0x4,
}

const ConfirmPasswordReset: React.FC<ConfirmPasswordResetProps> = ({
  token = '',
  newPassword = '',
  newPasswordConfirm = '',
  message,
}) => {
  const [msg, setMsg] = React.useState(message);
  const [currentToken, setCurrentToken] = React.useState(token);
  const [currentNewPassword, setCurrentNewPassword] = React.useState(newPassword);
  const [currentNewPasswordConfirm, setCurrentNewPasswordConfirm] = React.useState(newPasswordConfirm);

  const history = useHistory();
  const [errors, setErrors] = React.useState(0);

  React.useEffect(
    () =>
      setErrors(
        (currentNewPassword.length >= 6 ? 0 : formErrors.weakPw) |
          (currentNewPasswordConfirm === currentNewPassword ? 0 : formErrors.pwMismatch) |
          (currentToken.length > 0 ? 0 : formErrors.noToken),
      ),
    [currentNewPassword, currentNewPasswordConfirm, currentToken],
  );

  const changePassword = () => {
    confirmPwReset(
      currentToken,
      currentNewPassword,
      (_: AppAffirmative) => {
        setMsg(
          <Message success>
            <Message.Header>Success</Message.Header>
            Redirecting you to the login page in a few seconds...
          </Message>,
        );

        setTimeout(() => history.push('/login'), 3000);
      },
      (err: AppError) => setMsg(err.toMessage()),
      config.passwordResetEndpoint,
    );
  };

  return (
    <Container>
      {msg}
      <Segment>
        <Header>
          <Header.Content className="slimjoe">Confirm reset</Header.Content>
        </Header>

        <p>Check your email for a reset token. Enter it below, then enter a new password.</p>

        <Form>
          <Form.Field className="slimjoe">
            <Form.Input
              label="Token"
              placeholder="random characters"
              onChange={(e) => setCurrentToken(e.target.value)}
              value={currentToken}
            />
          </Form.Field>
          <Form.Field className="slimjoe">
            <Form.Input
              label="New password"
              placeholder="Something strong"
              type="password"
              onChange={(e) => setCurrentNewPassword(e.target.value)}
              value={currentNewPassword}
            />
          </Form.Field>
          <Form.Field className="slimjoe">
            <Form.Input
              label="Confirm new password"
              placeholder="Something strong"
              type="password"
              onChange={(e) => setCurrentNewPasswordConfirm(e.target.value)}
              value={currentNewPasswordConfirm}
            />
          </Form.Field>

          <List>
            <ErrorCheck err={errors & formErrors.noToken} name="Has token" />
            <ErrorCheck err={errors & formErrors.weakPw} name="Password is long enough" />
            <ErrorCheck err={errors & formErrors.pwMismatch} name="Passwords match" />
          </List>

          <Form.Field className="slimjoe">
            <Form.Button primary onClick={changePassword} disabled={errors !== 0}>
              Submit
            </Form.Button>
          </Form.Field>
        </Form>
      </Segment>
    </Container>
  );
};

export default ConfirmPasswordReset;
