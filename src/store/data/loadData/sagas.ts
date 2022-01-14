import { call, put, select } from 'redux-saga/effects';
import { history } from '../../../redux/reducers';
import { getDataFromFirebase } from '../../../api';

export function* worker_loadData() {
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
            children: dataFromFirebase.filter(item => item.parentId === 0).map(item => item.id)
        }});
    }
}