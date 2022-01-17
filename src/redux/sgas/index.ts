import { call, spawn, all } from 'redux-saga/effects';
import { loadBasicData } from './initial';
import { charactersSaga } from './characters';

export default function* rootSaga() {
    const sagas = [loadBasicData, charactersSaga]; // TODO add comments how its works
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