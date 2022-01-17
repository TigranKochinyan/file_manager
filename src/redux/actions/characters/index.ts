import { call, select } from "redux-saga/effects";
import { loadData } from "../initial";
import { 
    postItemToFirbase,
    deleteItemFromFirebase,
    updateItemChildren,
    updateFile,
    deleteItemsFromFirebase
} from '../../../api';
import { getAllChildrenIds } from "../../../utils";

export function* updateFileOnAction(action) {
    const { id, content, name } = action.payload;
    yield call(updateFile, id, name, content);
    yield call(loadData);
}

export function* postOnAction(action) {
    const { folder } = action.payload;
    const currentItem = yield select((state) => state.currentItem);
    if(folder.parents.includes(0)) {// should delete
        folder.parents = folder.parents.filter(parentId => parentId !== 0);
    }
    if (currentItem.id !== 0) {
        yield call(updateItemChildren, currentItem.id, [...currentItem.children, folder.id])
    }
    yield call(postItemToFirbase, folder);
    yield call(loadData);
}

export function* deleteOnAction(action) {
    const { id } = action.payload;
    const foldersInfo = yield select((state) => state.data);
    if(id === 0) {
        yield call(deleteItemsFromFirebase, foldersInfo.map(item => item.id));
        yield call(loadData);
    } else {
        const currentItem = foldersInfo.find(item => item.id === id);
        const parrentItem = foldersInfo.find(item => item.id === currentItem.parentId);
        if (currentItem.type === 'folder') {// if item is folder delete their children
            let shouldDeleteIds = getAllChildrenIds(foldersInfo, currentItem.id);
            yield call(deleteItemsFromFirebase, shouldDeleteIds);
        } else {
            yield call(deleteItemFromFirebase, `${id}`);
        }
        if (parrentItem) {//when item has parent, delete current id from parent
            const updatedChildren = parrentItem.children.filter(childId => childId !== currentItem.id);
            yield call(updateItemChildren, currentItem.parentId, updatedChildren);
        }
        yield call(loadData);
    }
    yield call(loadData);
}