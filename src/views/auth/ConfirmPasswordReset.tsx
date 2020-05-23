import React from 'react'
import { List, Container, Segment, Form, Header, } from 'semantic-ui-react'
import { confirmPwReset } from '../../api/user/confirmPwReset'
import { AppAffirmative, AppError } from '../../api/core'
import ErrorCheck from '../shared/ErrorCheck'

type ConfirmPasswordResetProps = {
    endpoint: string,

    message?: React.ReactNode,

    token?: string,
    newPassword?: string,
    newPasswordConfirm?: string,
}

enum formErrors {
    weakPw = 0x1,
    pwMismatch = 0x2,
    noToken = 0x4
}

const ConfirmPasswordReset = ({endpoint, token = "", newPassword = "", newPasswordConfirm = "", message = undefined}: ConfirmPasswordResetProps) => {
    const [msg, setMsg] = React.useState(message)
    const [currentToken, setCurrentToken] = React.useState(token)
    const [currentNewPassword, setCurrentNewPassword] = React.useState(newPassword)
    const [currentNewPasswordConfirm, setCurrentNewPasswordConfirm] = React.useState(newPasswordConfirm)

    const checkErrors = () => (
        (currentNewPassword.length >= 6                   ? 0 : formErrors.weakPw) |
        (currentNewPasswordConfirm === currentNewPassword ? 0 : formErrors.pwMismatch) |
        (currentToken.length > 0                          ? 0 : formErrors.noToken)
    )

    const [errors, setErrors] = React.useState(0)

    React.useEffect(() => setErrors(checkErrors()), [currentNewPassword, currentNewPasswordConfirm, currentToken])

    const changePassword = () => {
        confirmPwReset(
            currentToken,
            currentNewPassword,
            (success: AppAffirmative) => setMsg(success.toMessage()),
            (err: AppError) => setMsg(err.toMessage()),
            endpoint,
        )
    }

    return (
        <Container>
            {msg}
            <Segment>
                <Header>
                    <Header.Content className="slimjoe">
                        Confirm reset
                    </Header.Content>
                </Header>

                <p>
                    Check your email for a reset token. Enter it below,
                    then enter a new password.
                </p>

                <Form>
                    <Form.Field className="slimjoe">
                        <Form.Input label="Token"
                                    placeholder="random characters"
                                    onChange={(e) => setCurrentToken(e.target.value)}
                                    value={currentToken} />
                    </Form.Field>
                    <Form.Field className="slimjoe">
                        <Form.Input label="New password"
                                    placeholder="Something strong"
                                    type="password"
                                    onChange={(e) => setCurrentNewPassword(e.target.value)}
                                    value={currentNewPassword} />
                    </Form.Field>
                    <Form.Field className="slimjoe">
                        <Form.Input label="Confirm new password"
                                    placeholder="Something strong"
                                    type="password"
                                    onChange={(e) => setCurrentNewPasswordConfirm(e.target.value)}
                                    value={currentNewPasswordConfirm} />
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
    )
}

export default ConfirmPasswordReset
