// import reduxSaga from "redux-saga";
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { routerMiddleware } from 'connected-react-router';
import reducer, { history } from './reducers';
import rootSaga from './sgas';
import { composeWithDevTools } from 'redux-devtools-extension';

declare const window: any; //TODO

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )
    )
)

sagaMiddleware.run(rootSaga);

export default store;