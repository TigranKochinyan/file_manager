import { call, spawn, all, take, select } from 'redux-saga/effects';
import { loadBasicData, loadData } from './initialData';
// import { createCharacterSaga } from './charactersSaga';
 
export function* postOnAction() {
    while (true) {
        const action = yield take('ADD_CHARACTER')
        const { folder } = action.payload;

        const currentItem = yield select((state) => state.app.currentItem);
        delete currentItem.childs;

        if(folder.parents.includes(0)) {
            folder.parents = folder.parents.filter(_ => _ !== 0)
        }

        if (currentItem.id !== 0) {
            const responsePut = yield call(fetch, `http://localhost:3005/characters/${currentItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...currentItem,
                    children: [...currentItem.children, folder.id]
                })
            })
        }

        const response = yield call(fetch, 'http://localhost:3005/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(folder)
        })

        yield call(loadData)
    }
}

export function* deleteOnAction() {
    while (true) {
        const action = yield take('DELETE_ITEM')
        const { id } = action.payload;

        const foldersInfo = yield select((state) => state.app.data);

        const itemParent = foldersInfo.find(item => {
            return item.children[item.children.length - 1] === id
        })
        
        if (itemParent.id !== 0) {
            delete itemParent.childs;
            let updatedChildren = itemParent.children.filter(itemId => itemId !== id)
            
            const responsePut = yield call(fetch, `http://localhost:3005/characters/${itemParent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...itemParent,
                    children: updatedChildren
                })
            })
        }

        const response = yield call(fetch, `http://localhost:3005/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
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