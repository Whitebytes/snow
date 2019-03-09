import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {}
const windowExist = typeof window === 'object';

export default createStore(rootReducer,  windowExist && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE
    ? window.REDUX_DEVTOOLS_EXTENSION_COMPOSE
    : compose
    );

export function initializeStore (initialState = exampleInitialState) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}