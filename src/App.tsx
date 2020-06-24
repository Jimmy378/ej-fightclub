import React, { useEffect } from 'react';
import { IonApp } from '@ionic/react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, ConfigureStore, History } from 'store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import Routes from './pages';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import '@ionic/react/css/core.css';
import { ThemeProvider } from 'styled-components';
import Theme from 'util/theme';
import useServiceWorker from 'components/useServiceWorker';

const store = ConfigureStore();

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
    enableClaims: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.auth();
firebase.storage();

const App: React.FC = () => {
  const { updateAvailable, triggerUpdate } = useServiceWorker();

  return (
    <IonApp>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <ConnectedRouter history={History}>
            <PersistGate loading={null} persistor={persistor(store as any)}>
              <ThemeProvider theme={Theme}>
                <Routes updateAvailable={updateAvailable} triggerUpdate={triggerUpdate} />
              </ThemeProvider>
            </PersistGate>
          </ConnectedRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    </IonApp>
  );
};

export default App;
