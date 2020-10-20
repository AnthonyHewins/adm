import {types, flow} from 'mobx-state-tree'
import {LoadingState, AuthState} from 'stores/enums'

const AuthStore = types
    .model('AuthStore', {
        loadState: types.optional(types.enumeration<LoadingState>(Object.values(LoadingState)), LoadingState.Init),
        authState: types.optional(types.enumeration<AuthState>(Object.values(AuthState)), AuthState.Unauthenticated),
        token: types.maybeNull(types.string),
    })
    .actions(self => {
        const login = flow(function* () {
            /*
             *
            self.authState = AuthState.Authenticating
            try {
                createUser(userPayload);
                yield createIdentity();
                self.authState = AuthState.Authenticated
                return true;
            } catch (error) {
                self.authState = AuthState.Unauthenticated
                console.error('Error logging in: ', error);
                return false;
            }
             */
        });

        return {
            login,
        }
    })

export type IAuthStore = typeof AuthStore.Type
export default AuthStore;
