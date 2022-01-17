import { all, takeLatest } from "redux-saga/effects";
import { deleteOnAction, postOnAction, updateFileOnAction } from '../../actions/characters';

export function* charactersSaga() {
    yield all([
        takeLatest('ADD_CHARACTER', postOnAction),
        takeLatest('DELETE_ITEM', deleteOnAction),
        takeLatest('EDIT_FILE', updateFileOnAction)
    ]);
}