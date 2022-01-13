import { call, spawn, all, take, select } from 'redux-saga/effects';
import { loadBasicData, loadData } from './initialData';
// import { createCharacterSaga } from './charactersSaga';
import { postItemToFirbase, deleteItemFromFirebase, updateItemChildren } from '../../api';


export function* postOnAction() {
    while (true) {
        const action = yield take('ADD_CHARACTER')
        const { folder } = action.payload;

        const currentItem = yield select((state) => state.app.currentItem);
        delete currentItem.childs;

        if(folder.parents.includes(0)) {// should delete
            folder.parents = folder.parents.filter(_ => _ !== 0)
        }

        if (currentItem.id !== 0) {
            yield call(updateItemChildren, currentItem.id, [...currentItem.children, folder.id])
        }
        yield call(postItemToFirbase, folder)
        yield call(loadData)
    }
}

export function* deleteOnAction() {
    while (true) {
        const action = yield take('DELETE_ITEM');
        const { id } = action.payload;
        const foldersInfo = yield select((state) => state.app.data);
        const currentItem = foldersInfo.find(item => item.id === id)
        const parrentItem = foldersInfo.find(item => item.id === currentItem.parentId)
        const updatedChildren = parrentItem.children.filter(childId => childId !== currentItem.id)
        
        yield call(updateItemChildren, currentItem.parentId, updatedChildren)
        yield call(deleteItemFromFirebase, `${id}`)
        yield call(loadData)
    }
}

export default function* rootSaga() {
    const sagas = [loadBasicData, postOnAction, deleteOnAction]; // TODO add comments how its works
    const retrySagas = sagas.map(saga => {
        return spawn(function*(){
            while (true) {
                try {
                    yield call(saga);
                    break;
                } catch(error) {
                    console.log(error);
                }
            }
        })
    })
    yield all(retrySagas)
}