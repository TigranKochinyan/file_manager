import { call, fork, all, put } from 'redux-saga/effects';

function* loadData() {
    const response = yield call(fetch, 'http://localhost:3001/folders');
    const data = yield call([response, response.json]);
    yield put({type: 'SET_CURRENT_ITEM', payload: data});
    yield put({type: 'SET_DATA', payload: data});
}

export function* loadBasicData() {
    yield all([
        fork(loadData)
    ]);
}