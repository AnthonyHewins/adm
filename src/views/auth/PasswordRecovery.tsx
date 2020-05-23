import React from 'react';
import { AppError, AppAffirmative} from '../../api/core'
import {pwReset} from '../../api/user/pwReset'
import {JwtResponse} from '../../api/user/jwt'
import {Message, Header, Container, Segment, Form} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

export interface PasswordRecovery {
    endpoint?: string,

    email?: string,

    setLoggedIn?: (currentLoginStatus: boolean) => void,

    message?: React.ReactNode,
}

export function PasswordRecovery({
    email    = '',
    message  = undefined,
    endpoint = "/api/v1/auth/reset_password",
}) {
    const [   currentEmail,    setCurrentEmail] = React.useState(email)
    const [resetState, setResetState] = React.useState({msg: message, reset: false})

    const history = useHistory()

    const onClick = () => pwReset(
        currentEmail,
        (_: AppAffirmative) => history.push("/confirm-password-reset"),
        (err: AppError) => setResetState({msg: err.toMessage(), reset: false}),
        endpoint,
    )

    return (
        <Container>
            {resetState.msg}
            <Segment padded='very'>
                <Header>
                    <Header.Content className='slimjoe'>
                        Reset password
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
                        <Form.Button primary disabled={resetState.reset} className="slimjoe" type='submit' onClick={onClick}>
                            Submit
                        </Form.Button>
                        {resetState.reset && <p>Already logged in.</p>}
                    </Form.Field>
                </Form>
            </Segment>
        </Container>
    );
};
