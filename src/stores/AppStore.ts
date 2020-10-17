import {createContext, useContext} from 'react'
import {types, cast} from 'mobx-state-tree'
import AuthStore from 'stores/AuthStore'

const floatMatrix = types.array(types.array(types.number))

const AppStore = types
    .model('AppStore', {
       authStore: types.optional(AuthStore, {}),
       polynomialRegression: types.optional(floatMatrix, []),
       featureEngineering: types.optional(floatMatrix, []),
    })
    .actions(self => {
        const setPolynomialRegression = (f: number[][]): void => {
            self.polynomialRegression = cast(f)
        }

        const setFeatureEngineering = (f: number[][]): void => {
            self.featureEngineering = cast(f)
        }

        return {
            setPolynomialRegression,
            setFeatureEngineering,
        }
    })

//https://medium.com/7shifts-engineering-blog/testing-usecontext-react-hook-with-enzyme-shallow-da062140fc83
const store = AppStore.create();
const context = createContext(store);
export const useAppContext = () => useContext(context);
export type IAppStore = typeof AppStore.Type;

export default AppStore;
