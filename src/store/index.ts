import { Store, createStore, applyMiddleware, Dispatch, Action, AnyAction, compose } from 'redux';
import thunkMiddleware, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createHashHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import { AppState, InitialState } from './state';
import { AppReducer } from './reducer';
import { persistStore, Persistor, persistReducer } from 'redux-persist';

export const History = createHashHistory();

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['router'],
};

export const persist = (persistConfig: any, reducer: any) => persistReducer({ ...persistConfig, storage }, reducer);

const persistedReducer = persist(persistConfig, AppReducer(History));

export function ConfigureStore() {
  const composeEnhancers = composeWithDevTools({});
  const thunk: ThunkMiddleware<AppState, AnyAction> = thunkMiddleware;
  const store = createStore(
    persistedReducer,
    InitialState() as any,
    composeEnhancers(applyMiddleware(routerMiddleware(History), thunk)),
  );
  return store;
}

export const persistor = (store: Store<AppState>): Persistor => {
  return persistStore(store);
};

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export interface ConnectedReduxThunkProps {
  dispatch: ThunkDispatch<AppState, any, AnyAction>;
}

export interface ConnectedState {
  AppState: AppState;
}
