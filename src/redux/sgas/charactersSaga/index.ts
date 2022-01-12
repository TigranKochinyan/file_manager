import { call, apply, takeEvery, takeLatest } from "redux-saga/effects";


const getData = newFolder => fetch('http://localhost:3005/characters', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newFolder) // body data type must match "Content-Type" header
});

export function* createCharacterSaga(action) {
    console.log('ssss', action);
    

    // const { folder } = action;
    // const subscriberDetails = yield axios.post(`${ENDPOINTS.SUBSCRIBER.POST.URL}`, subscriber).then(response => response.data);
    // yield put({ type: types.CREATE_SUBSCRIBER_SUCCESS, data: subscriberDetails });
    // } catch (error) {
    //     yield put({ type: types.CREATE_SUBSCRIBER_FAILED, error });
    // }
    const newFolder = {
        id: 77777778978,
        name: 'Vardaeffffffffffffn',
        type: 'folder',
        children: [],
        parents: []
    }
    console.log('mog');
    const request = yield call(getData, newFolder)
    const data = yield call(request, request.json)

    console.log('aaaaaaaaaaaaaaa', data);
    
 
}

export default function* charactersSaga() {
    yield takeLatest('ADD_CHARACTER', createCharacterSaga)
}