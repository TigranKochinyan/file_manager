import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { appReducer } from './characters';
import { curentItemReducer } from './currentItem';

export const history = createBrowserHistory();

interface InitialStateData {
    data: any;
}

interface InitialStateCurrentItem {
    
}

const initialData = {
    data: []
}

const initialCurentItem = {
    currentItem: {}, // file or folder

}

const rootReducer = combineReducers({
    data: appReducer,
    currentItem: curentItemReducer,
    router: connectRouter(history)
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;