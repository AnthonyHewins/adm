export default {
    appName: process.env.REACT_APP_APP_NAME,
    apiBase: process.env.REACT_APP_API_BASE,

    polyReg: process.env.REACT_APP_POLYREG || '/poly-reg',
    featureEngineering: process.env.REACT_APP_FEATURE_ENGINEERING || '/feature-engineering',
    registration: process.env.REACT_APP_REGISTRATION || '/registration',
    acctConfirmation: process.env.REACT_APP_ACCT_CONFIRMATION || '/registration/confirmation',
    login: process.env.REACT_APP_LOGIN || '/login',
    refreshToken: process.env.REACT_APP_REFRESH_TOKEN || '/confirm-acct',

    resetPassword: process.env.REACT_APP_PASSWORD_RESET || '/reset-password',
    confirmReset: process.env.REACT_APP_CONFIRM_RESET || '/confirm-password-reset',
}
