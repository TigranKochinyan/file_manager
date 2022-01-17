import { fork, all, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { loadData, changeCurrentItemWithRouter } from '../../actions/initial'; 

export function* loadBasicData() {
    yield all([
        fork(loadData),
        takeLatest(LOCATION_CHANGE, changeCurrentItemWithRouter)
    ]);
}