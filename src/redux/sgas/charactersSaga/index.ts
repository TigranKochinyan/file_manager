import { call, all, fork, select, take } from "redux-saga/effects";
import { loadData } from "../initialData";
import { postItemToFirbase, deleteItemFromFirebase, updateItemChildren, updateFile } from '../../../api';


export function* updateFileOnAction() {
    while(true) {
        const action = yield take('EDIT_FILE');
        const { id, content, name } = action.payload;
        yield call(updateFile, id, name, content);
        yield call(loadData);
    }
}

export function* postOnAction() {
    while (true) {
        const action = yield take('ADD_CHARACTER');
        const { folder } = action.payload;

        const currentItem = yield select((state) => state.app.currentItem);
        delete currentItem.childs;

        if(folder.parents.includes(0)) {// should delete
            folder.parents = folder.parents.filter(parentId => parentId !== 0);
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

export function* charactersSaga() {
    yield all([
        fork(postOnAction),
        fork(deleteOnAction),
        fork(updateFileOnAction)
    ]);
}