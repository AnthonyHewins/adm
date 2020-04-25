import React from 'react';
import {register} from '../api/register'
import {Header, Icon, List, Container, Segment, Form} from 'semantic-ui-react';
import * as yup from 'yup';

enum ERR {
    email   = 0x1,
    pwShort = 0x2,
    pwMatch = 0x4,
};

export interface RegisterProps {
    // Data
    email?:           string,
    password?:        string,
    passwordConfirm?: string,
    message?:         React.ReactNode,

    //Meta
    passwordLength?:  number,
    endpoint?:        string,
}

export function Register({email = "", password = "", passwordConfirm = "", message = null, passwordLength = 6, endpoint = "/api/v1/register"}: RegisterProps) {
    const [mail, setMail]           = React.useState(email);
    const [pw, setPw]               = React.useState(password);
    const [pwConfirm, setPwConfirm] = React.useState(passwordConfirm);
    const [msg, setMsg]             = React.useState(message);

    const emailSchema = yup.string().email().lowercase().required();

    const checkErrors = () => (
        (pw.length < passwordLength      ? ERR.pwShort : 0) |
        (pw != pwConfirm                 ? ERR.pwMatch : 0) |
        (!emailSchema.isValidSync(email) ? ERR.email   : 0)
    );

    let [errors, setErrors] = React.useState(0);
    React.useEffect(() => setErrors(checkErrors()), [email, pw, pwConfirm]);

    const onClick = () => setMsg( register(email, pw, endpoint).toMessage() )

    return (
        <Container>
            {msg}
            <Segment padded='very'>
                <Header>
                    <Header.Content className='slimjoe'>
                        New account
                    </Header.Content>
                </Header>

                <Form>
                    <Form.Field>
                        <label className="slimjoe">Email</label>
                        <Form.Input placeholder='Email'
                                    value={mail}
                                    onChange={e => setMail(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label className="slimjoe">Password</label>
                        <Form.Input type='password'
                                    placeholder='Password'
                                    value={pw}
                                    onChange={e => setPw(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label className="slimjoe">Confirm password</label>
                        <Form.Input type="password"
                                    placeholder='Password again'
                                    onChange={e => setPwConfirm(e.target.value)} />
                    </Form.Field>

                    <List>
                        <Check err={Boolean(errors & ERR.email)}
                               name="Email is valid" />
                        <Check err={Boolean(errors & ERR.pwShort)}
                               name="Password is long enough" />
                        <Check err={Boolean(errors & ERR.pwMatch)}
                               name="Passwords match" />
                    </List>

                    <Form.Button primary type='submit' disabled={errors != 0} onClick={onClick}>
                        Submit
                    </Form.Button>
                </Form>
            </Segment>
        </Container>
    );
};

interface checkProps {
    err: boolean,
    name: string,
}

const Check: React.FC<checkProps> = (props) => {
    let icon;
    if (props.err)
        icon = <Icon color='red' name='close'/>;
    else
        icon = <Icon color='green' name='check'/>;

    return (
        <List.Item>
            {icon}
            <List.Content>
                {props.name}
            </List.Content>
        </List.Item>
    );
};
