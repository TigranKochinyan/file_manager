import { call, spawn, all, take } from 'redux-saga/effects';
import { loadBasicData } from './initialData';
import { createCharacterSaga } from './charactersSaga';

function* getUpdatedDataSaga() {
    while (true) {
        const action = take('ADD_CHARACTER');
        console.log('getUpdatedData action', action);
        
    }
} 

export function* postOnAction() {
    while (true) {
        const action = yield take('ADD_CHARACTER')
        const { folder } = action.payload;
        

        const response = yield call(fetch, 'http://localhost:3005/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(folder) // body data type must match "Content-Type" header
        })
    }
}

export default function* rootSaga() {
    const sagas = [loadBasicData, postOnAction]; // TODO add comments how its works
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