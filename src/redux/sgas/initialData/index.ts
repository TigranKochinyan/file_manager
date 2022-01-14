import { call, fork, all, put, select, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { history } from '../../reducers';
import { getObject, isEmptyObject, folderCretor, getIdFromPath } from '../../../utils';
import { getDataFromFirebase } from '../../../api';
import { FolderTypes } from '../../../types/folder';
import { FileTypes } from '../../../types/file';

export function* loadData() {
    const dataFromFirebase = yield call(getDataFromFirebase);
    yield put({type: 'SET_DATA', payload: dataFromFirebase});

    const route = yield select((state) => state.router);
    if (route.location.pathname !== '/') {
        const currentFolderId: number = getIdFromPath(route.location.pathname); // get id what should be "currentItem"
        const currentItem: FolderTypes | FileTypes = dataFromFirebase.find(item => item.id === currentFolderId); // get item what be "currentitem" from database
        if (currentItem) {
            yield put({type: 'SET_CURRENT_ITEM', payload: currentItem});
        } else {
            history.push('/not-found');
        }
    } else {
        yield put({type: 'SET_CURRENT_ITEM', payload: folderCretor({
            id: 0,
            parentId: 0,
            type: 'folder',
            name: '',
            parents: [],
            children: dataFromFirebase.filter(item => item.parentId === 0).map(item => item.id)
        })});
    }
}

export function* changeCurrentItemWithRouter(action) {
    const data = yield select(state => state.data);
    if(isEmptyObject(data) || !data.length || action.payload.location.pathname === '/') {
        yield put({type: 'SET_CURRENT_ITEM', payload: folderCretor({
            id: 0,
            parentId: 0,
            type: 'folder',
            name: '',
            parents: [],
            children: data.filter(item => !item.parents.length).map(item => item.id)
        })});
    } else {
        const id = Number(action.payload.location.pathname.slice(action.payload.location.pathname.lastIndexOf('/') + 1))
        const currentItem = getObject(data, id);
        yield put({type: 'SET_CURRENT_ITEM', payload: currentItem});
    }
}

export function* loadBasicData() {
    yield all([
        fork(loadData),
        takeLatest(LOCATION_CHANGE, changeCurrentItemWithRouter)
    ]);
}