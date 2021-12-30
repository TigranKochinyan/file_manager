// import reduxSaga from "redux-saga";
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { routerMiddleware } from 'connected-react-router';
import reducer, { history } from './reducers';
import rootSaga from './sgas';

declare const window: any; //TODO 


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )
    )
)

sagaMiddleware.run(rootSaga)

export default store;