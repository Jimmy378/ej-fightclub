import * as Data from './DATA/state';
import { FirestoreReducer, FirebaseReducer } from 'react-redux-firebase';

export type AppState = {
  router: {
    location: {
      pathname: string;
      search: string;
      hash: string;
    };
    action: string;
  };
  firestore: FirestoreReducer.Reducer,
  firebase: FirebaseReducer.Reducer
  Data: Data.State;
};

export const InitialState = () => {
  return {
    Data: Data.InitialState,
  };
};