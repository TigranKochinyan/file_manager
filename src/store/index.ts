import saga from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { configureStore } from '@reduxjs/toolkit'

import { watchCommonSaga } from './sagas';
import RootReducer from './slices';

function* RootSaga() {
  yield all([fork(watchCommonSaga)])
}

const sagaMiddleware = saga();

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(RootSaga);

console.log('store.getState___000', store.getState());


export type RootState = ReturnType<typeof store.getState>

export default store;