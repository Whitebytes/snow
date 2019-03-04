import { createStore, applyMiddleware } from 'redux'
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {}
export default createStore(rootReducer, typeof(window)!='undefined' 
    && window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export function initializeStore (initialState = exampleInitialState) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}