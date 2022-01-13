import { call, fork, all, put, take, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { history } from '../../reducers';
import { getObject, isEmptyObject } from '../../../utils/utils';
import { getDataFromFirebase } from '../../../api';

export function* loadData() {
    const dataFromFirebase = yield call(getDataFromFirebase);
    yield put({type: 'SET_DATA', payload: dataFromFirebase});

    const route = yield select((state) => state.router);
    if (route.location.pathname !== '/') {
        let currentFolderId = route.location.pathname.split('/')
        currentFolderId = Number(currentFolderId[currentFolderId.length - 1])
        const currentItem = dataFromFirebase.find(item => item.id === currentFolderId)
        if (currentItem) {
            yield put({type: 'SET_CURRENT_ITEM', payload: currentItem});
        } else {
            history.push('/not-found');
        }
    } else {
        yield put({type: 'SET_CURRENT_ITEM', payload: {
            id: 0,
            parentId: 0,
            type: 'folder',
            name: '',
            parents: [],
            children: dataFromFirebase.filter(item => item.parentId === 0).map(item => item.id),
            childs: dataFromFirebase.filter(item => item.parentId === 0)
        }});
    }
}

export function* changeCurrentItemWithRouter(){
    while (true) {
        const action = yield take(LOCATION_CHANGE);
        const data = yield select(s => s.app.data);
        if(isEmptyObject(data) || !data.length || action.payload.location.pathname === '/') {
            yield put({type: 'SET_CURRENT_ITEM', payload: {
                id: 0,
                parentId: 0,
                type: 'folder',
                name: '',
                parents: [],
                children: data.filter(item => item.parentId === 0).map(item => item.id),
                childs: data.filter(item => item.parentId === 0)
            }});
        } else {
            const id = Number(action.payload.location.pathname.slice(action.payload.location.pathname.lastIndexOf('/') + 1))
            const currentItem = getObject(data, id);
            yield put({type: 'SET_CURRENT_ITEM', payload: currentItem});
        }
        
    }
}

export function* loadBasicData() {
    yield all([
        fork(loadData),
        fork(changeCurrentItemWithRouter)
    ]);
}