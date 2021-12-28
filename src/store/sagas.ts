import { put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import * as slicesActions from './slices';

import { getObject } from '../utils/utils';

import db from '../db/db.json';

function* setCurrentFolder(action: ReturnType<typeof actions.setCurrentFolder>){
  yield put(slicesActions.setIsLoading(true))
  try {
    const data = db;
    const {
        payload: { id },
    } = action;
    const currentFolder = getObject(data, id);

    yield put(slicesActions.setCurrentFolder(currentFolder));
  } catch (err) {
      console.error(err);
  }
}

function* getCurrentFolder(action: ReturnType<typeof actions.getCurrentFolder>){
    yield put(slicesActions.setIsLoading(true))
    try {
        const data = db;
        const {
            payload: { id },
        } = action
        const currentFolder = getObject(data, id)
    
        yield put(slicesActions.setCurrentFolder(currentFolder))
    } catch (err) {
        console.error(err)
    }
}

function* getFoldersInfo(action: ReturnType<typeof actions.getFoldersInfo>){
    yield put(slicesActions.setIsLoading(true))

    try {
        const data = db;
    
        yield put(slicesActions.setFoldersInfo(data))
    } catch (err) {
        console.error(err)
    }
}

export function* watchCommonSaga() {
  yield takeLatest(actions.getFoldersInfo.type, getFoldersInfo)
  yield takeLatest(actions.getCurrentFolder.type, getCurrentFolder)
  yield takeLatest(actions.setCurrentFolder.type, setCurrentFolder)
}
