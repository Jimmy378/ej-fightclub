import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
  firebaseReducer
} from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';

import * as Data from './DATA/reducers';

export const AppReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    Data: Data.Reducer,
  });
