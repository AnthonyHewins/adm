import {types} from 'mobx-state-tree'
import LoadingState from './LoadingState'

const AuthStore = types
    .model('AuthStore', {
        state: types.enumeration<LoadingState>(LoadingState),
        token: types.maybeNull(types.string, null),
    })
    .actions(self => {
        const login = flow(function* (userPayload: AwsUser) {
            try {
                createUser(userPayload);
                yield createIdentity();
                self.authState = 'authenticated';
                return true;
            } catch (error) {
                self.authState = 'not-authenticated';
                console.log('Error logging in: ', error);
                message.error(`Problem logging in: ${error.message}`);
                return false;
            }
        });

        return {
            login,
        }
    })

export type IAuthStore = typeof AuthStore.Type
export default AuthStore;
