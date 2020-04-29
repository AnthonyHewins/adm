import React from 'react';
import {ServerError} from '../api/core'
import {login} from '../api/user/login'
import {Header, Container, Segment, Form} from 'semantic-ui-react';

export interface LoginProps {
    endpoint?: string,

    email?: string,
    password?: string,

    message?: React.ReactNode,
}

export function Login({
    email    = undefined,
    password = undefined,
    message  = undefined,
    endpoint = "/api/v1/auth",
}: LoginProps) {
    const [   currentEmail,    setCurrentEmail] = React.useState(email)
    const [currentPassword, setCurrentPassword] = React.useState(password)
    const [            msg,             setMsg] = React.useState(message)

    const onClick = () => login(
        email,
        password,
        (token: string) => localStorage.setItem("jwt", token),
        (err: ServerError) => setMsg(err.toMessage()),
        endpoint,
    )

    return (
        <Container>
            {msg}
            <Segment padded='very'>
                <Header>
                    <Header.Content className='slimjoe'>
                        Login
                    </Header.Content>
                </Header>

                <Form>
                    <Form.Field>
                        <label className="slimjoe">Email</label>
                        <Form.Input placeholder="Email"
                                    value={currentEmail}
                                    onChange={e => setCurrentEmail(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label className="slimjoe">Password</label>
                        <Form.Input type="password"
                                    placeholder="Password"
                                    value={currentPassword}
                                    onChange={e => setCurrentPassword(e.target.value)} />
                    </Form.Field>
                    <Form.Button primary className="slimjoe" type='submit' onClick={onClick}>
                        Submit
                    </Form.Button>
                </Form>
            </Segment>
        </Container>
    );
};
