import React from 'react';
import {Header, Container, Segment, Form} from 'semantic-ui-react';

export interface LoginProps {
    endpoint?: string,

    email?: string,
    password?: string,
}

const defaultProps: LoginProps = {
    endpoint: "/api/v1/login",
}

export const Login = (props = defaultProps) => {
    const [email, setEmail]       = React.useState(props.email);
    const [password, setPassword] = React.useState(props.password);

    return (
        <Container>
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
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label className="slimjoe">Password</label>
                        <Form.Input type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                    </Form.Field>
                    <Form.Button primary className="slimjoe" type='submit' onClick={() => null}>
                        Submit
                    </Form.Button>
                </Form>
            </Segment>
        </Container>
    );
};
