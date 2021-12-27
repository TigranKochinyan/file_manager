import axios, { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import * as slicesActions from './slices';
import { PostType } from './types';

import { getObject } from '../utils/utils';

import db from '../db/db.json';

function* getPostsApi(action: ReturnType<typeof actions.getPostsApi>) {
  yield put(slicesActions.setIsLoading(true))

  const {
    payload: { limit },
  } = action

  try {
    const { data }: AxiosResponse<Array<PostType>> = yield axios.get(
      `https://jsonplaceholder.typicode.com/users/1/posts?_limit=${limit}`,
    )

    yield put(slicesActions.setPosts(data))
  } catch (err) {
    console.error(err)
  }

  yield put(slicesActions.setIsLoading(false))
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
  yield takeLatest(actions.getPostsApi.type, getPostsApi)
  yield takeLatest(actions.getFoldersInfo.type, getFoldersInfo)
  yield takeLatest(actions.getCurrentFolder.type, getCurrentFolder)
}
