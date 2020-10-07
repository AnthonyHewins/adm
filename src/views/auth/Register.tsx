import React from 'react';
import { register } from '../../api/user/register';
import { Header, List, Container, Segment, Form } from 'semantic-ui-react';
import { AppError, AppAffirmative } from '../../api/core';
import Check from '../shared/ErrorCheck';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

enum Errors {
  email = 1 << 1,
  pwShort = 1 << 2,
  pwMatch = 1 << 3,
}

type RegisterProps = {
  // Data
  email?: string;
  password?: string;
  passwordConfirm?: string;
  message?: React.ReactNode;

  //Meta
  passwordLength?: number;
  endpoint?: string;
};

const Register: React.FC<RegisterProps> = ({
  email = '',
  password = '',
  passwordConfirm = '',
  message = null,
  passwordLength = 6,
  endpoint = '/api/v1/register',
}) => {
  const [mail, setMail] = React.useState(email);
  const [pw, setPw] = React.useState(password);
  const [pwConfirm, setPwConfirm] = React.useState(passwordConfirm);
  const [msg, setMsg] = React.useState(message);

  const checkErrors = () =>
    (pw.length < passwordLength ? Errors.pwShort : 0) |
    (pw !== pwConfirm ? Errors.pwMatch : 0) |
    (!emailRegex.test(mail) ? Errors.email : 0);

  const [errors, setErrors] = React.useState(0);
  React.useEffect(() => setErrors(checkErrors()), [checkErrors, mail, pw, pwConfirm]);

  const onClick = () =>
    register(
      mail,
      pw,
      (resp: AppAffirmative) => setMsg(resp.toMessage()),
      (err: AppError) => setMsg(err.toMessage()),
      endpoint,
    );

  return (
    <Container>
      {msg}
      <Segment padded="very">
        <Header>
          <Header.Content className="slimjoe">New account</Header.Content>
        </Header>

        <Form>
          <Form.Field>
            <label className="slimjoe">Email</label>
            <Form.Input placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label className="slimjoe">Password</label>
            <Form.Input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label className="slimjoe">Confirm password</label>
            <Form.Input type="password" placeholder="Password again" onChange={(e) => setPwConfirm(e.target.value)} />
          </Form.Field>

          <List>
            <Check err={errors & Errors.email} name="Email is valid" />
            <Check err={errors & Errors.pwShort} name="Password is long enough" />
            <Check err={errors & Errors.pwMatch} name="Passwords match" />
          </List>

          <Form.Field>
            <Form.Button primary type="submit" disabled={errors !== 0} onClick={onClick}>
              Submit
            </Form.Button>
          </Form.Field>
        </Form>
      </Segment>
    </Container>
  );
};

export default Register;
