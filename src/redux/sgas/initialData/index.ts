import { call, fork, all, put, take, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';

import { getObject } from '../../../utils/utils';

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

function* loadData() {
    const response = yield call(fetch, 'http://localhost:3001/folders');
    const data = yield call([response, response.json]);
    yield put({type: 'SET_DATA', payload: data});
    yield put({type: 'SET_CURRENT_ITEM', payload: data});
}

export function* changeCurrentItemWithRouter(){
    while (true) {
        const action = yield take(LOCATION_CHANGE);
        const data = yield select(s => s.app.data);
        if(isEmptyObject(data)) continue;
        
        const id = Number(action.payload.location.pathname.slice(action.payload.location.pathname.lastIndexOf('/') + 1))
        
        const currentItem = getObject(data, id);
        
        yield put({type: 'SET_CURRENT_ITEM', payload: currentItem});
    }
}

export function* loadBasicData() {
    yield all([
        fork(loadData),
        fork(changeCurrentItemWithRouter)
    ]);
}