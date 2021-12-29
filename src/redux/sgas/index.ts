import { call, spawn, all } from 'redux-saga/effects';
import { loadBasicData } from './initialData';


export default function* rootSaga() {
    const sagas = [loadBasicData]; // TODO add comments how its works
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