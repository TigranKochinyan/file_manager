import { call, fork, all, put, take, select, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import axios from 'axios';


import { getObject, isEmptyObject } from '../../../utils/utils';


function* loadData() {
    const response = yield call(fetch, 'http://localhost:3005/characters');//'http://localhost:3001/folders'
    const data = yield call([response, response.json]);
    yield put({type: 'SET_DATA', payload: data});
    yield put({type: 'SET_CURRENT_ITEM', payload: data});
    
}

export function* changeCurrentItemWithRouter(){// TODO not working in first rendering
    while (true) {
        const action = yield take(LOCATION_CHANGE);
        const data = yield select(s => s.app.data);
        if(isEmptyObject(data) || action.payload.location.pathname === '/') continue;
        
        
        const id = Number(action.payload.location.pathname.slice(action.payload.location.pathname.lastIndexOf('/') + 1))

        const currentItem = getObject(data, id)
        
        yield put({type: 'SET_CURRENT_ITEM', payload: currentItem});
    }
}

export function* loadBasicData() {
    yield all([
        fork(loadData),
        fork(changeCurrentItemWithRouter)
    ]);
}