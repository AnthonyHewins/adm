export enum LoadingState {
    Init = 'init',
    Idle = 'idle',
    Loading = 'loading',
    Error = 'error',
}

export enum Modes {
  meanNormalization = 'mean-normalization',
  zScore = 'zscore',
}

export enum AuthState {
    Unauthenticated = 'unauthenticated',
    Authenticating = 'authenticating',
    Authenticated = 'authenticated',
}
