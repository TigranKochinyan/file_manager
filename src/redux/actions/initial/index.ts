import { call, put, select } from 'redux-saga/effects';
import { history } from '../../reducers';
import { isEmptyObject, folderCretor, getIdFromPath } from '../../../utils';
import { getDataFromFirebase } from '../../../api';
import { FolderTypes, FileTypes } from '../../../types';

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
        const currentItem = data.find(item => item.id == id);
        yield put({type: 'SET_CURRENT_ITEM', payload: currentItem});
    }
}