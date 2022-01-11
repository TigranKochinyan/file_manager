import { call, fork, all, put, take, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
// import axios from 'axios'; // TODO change fetch to axios

import { getObject, isEmptyObject } from '../../../utils/utils';

export function* loadData() {
    const response = yield call(fetch, 'http://localhost:3005/characters');//'http://localhost:3001/folders'
    const data = yield call([response, response.json]);
    yield put({type: 'SET_DATA', payload: data});

    const route = yield select((state) => state.router)
    if (route.location.pathname !== '/') {
        console.log(route.location.pathname)
        let currentFolderId = route.location.pathname.split('/')
        currentFolderId = Number(currentFolderId[currentFolderId.length - 1])
        const currentItem = data.find(item => item.id === currentFolderId)
        yield put({type: 'SET_CURRENT_ITEM', payload: currentItem});
    } else {
        yield put({type: 'SET_CURRENT_ITEM', payload: {
            id: 0,
            parentId: 0,
            type: 'folder',
            name: '',
            parents: [],
            children: data.filter(item => item.parentId === 0).map(item => item.id),
            childs: data.filter(item => item.parentId === 0)
        }});
    }
}

export function* changeCurrentItemWithRouter(){// TODO not working in first rendering
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
        // fork(deleteCharacterWacher),
        // fork(addCharacterWatcher),
        fork(changeCurrentItemWithRouter)
    ]);
}