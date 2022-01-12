import { call, spawn, all, take, select } from 'redux-saga/effects';
import { loadBasicData, loadData } from './initialData';
// import { createCharacterSaga } from './charactersSaga';
import { getFirestore, collection, getDocs, updateDoc, setDoc, doc, deleteDoc } from 'firebase/firestore/lite';

import { db } from '../../firebase';

const postItemToFirbase = async (item) => {
    await setDoc(doc(db, "characters", `${item.id}` ), {...item})
}

const deleteItemFromFirebase = async (id: string) => {
    await deleteDoc(doc(db, "characters", id));
}

const updateItemChildren = async (id, children) => {
    console.log(id, children);
    
    await updateDoc(doc(db, "characters", `${id}`), {
        children: children
    })
}


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
            yield call(updateItemChildren, currentItem.id, [...currentItem.children, folder.id])
            // should delete    
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
            // should delete/
        }
        // should delete
        yield call(fetch, 'http://localhost:3005/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
        // should delete/

        yield call(postItemToFirbase, folder)
        

        yield call(loadData)
    }
}

export function* deleteOnAction() {
    while (true) {
        
        const action = yield take('DELETE_ITEM');
        const { id } = action.payload;

        const foldersInfo = yield select((state) => state.app.data);

        // console.log('foldersInfo', foldersInfo);
        // const itemParent = foldersInfo.find(item => {
        //     return item?.children[item?.children.length - 1] === id
        // })
        // console.log('itemParent', itemParent);

        const currentItem = foldersInfo.find(item => item.id === id)
        const parrentItem = foldersInfo.find(item => item.id === currentItem.parentId)
        const updatedChildren = parrentItem.children.filter(childId => childId !== currentItem.id)
        
        yield call(updateItemChildren, currentItem.parentId, updatedChildren)
        
        // if (itemParent.id !== 0) {
        //     delete itemParent.childs;
        //     let updatedChildren = itemParent.children.filter(itemId => itemId !== id)
           
            

        //     yield call(updateItemChildren, itemParent.id, updatedChildren)

        //     // should delete
        //     // const responsePut = yield call(fetch, `http://localhost:3005/characters/${itemParent.id}`, {
        //     //     method: 'PUT',
        //     //     headers: {
        //     //         'Content-Type': 'application/json'
        //     //     },
        //     //     body: JSON.stringify({
        //     //         ...itemParent,
        //     //         children: updatedChildren
        //     //     })
        //     // })
        //     // should delete/
        // }


        yield call(deleteItemFromFirebase, `${id}`)

        // should delete
        // const response = yield call(fetch, `http://localhost:3005/characters/${id}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // should delete
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