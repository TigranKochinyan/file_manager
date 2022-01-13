import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

interface InitialState {
    data: any;
    currentItem: any;
}

const initial = {
    data: [],
    currentItem: {}, // file or folder
}


export function appReducer(state: InitialState = initial, action) {
    switch (action.type) {
        case 'SET_DATA': {
            return {
                ...state,
                data: action.payload
            }
        }
        case 'SET_CURRENT_ITEM': {
            return {
                ...state,
                currentItem: action.payload
            }
        }
        // case 'ADD_ITEM': {
        //     return {
        //         ...state,
        //         currentItem: action.payload
        //     }
        // }
        case 'LOADING_DATA': {
            return {
                ...state,
                loading: true
            }
        }
        case 'LOADING_DATA_SUCCSESS': {
            return {
                ...state,
                loading: false,
            }
        }
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    app: appReducer,
    router: connectRouter(history)
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;