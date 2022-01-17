import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { appReducer } from './characters';
import { curentItemReducer } from './currentItem';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    data: appReducer,
    currentItem: curentItemReducer,
    router: connectRouter(history)
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;