import React, { FC, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ConnectedReduxThunkProps } from 'store';
import { connect } from 'react-redux';
import { AppState } from 'store/state';
import ProtectedRoute from '../components/protectedRoute';

//pages
import Home from './Home';
import SignIn from './SignIn';
import { useFirebase } from 'react-redux-firebase';
import { setAuthentication } from 'store/DATA/actions';

type Props = {
  updateAvailable: boolean;
  triggerUpdate(): void;
} & AppState &
  ConnectedReduxThunkProps;

const Routes: React.FC<Props> = ({ dispatch, firebase, Data, updateAvailable, triggerUpdate }) => {
  const fire = useFirebase();

  useEffect(() => {
    if (firebase.auth.isLoaded) {
      if (firebase.auth.isEmpty) {
        dispatch(setAuthentication(false));
      } else {
        let email = firebase.auth.email ? firebase.auth.email : '';
        if (email === 'jamesanderson.contact@gmail.com' || 'gabriellavawdrey@gmail.com') {
          dispatch(setAuthentication(true));
        } else {
          dispatch(setAuthentication(false));
          fire.logout();
        }
      }
    }
  }, [firebase.auth]);

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <ProtectedRoute
          exact
          path="/home"
          Component={<Home updateAvailable={updateAvailable} triggerUpdate={triggerUpdate} />}
          isAuthenticated={Data.authenticated}
          redirectPath={'/auth'}
        />
        <ProtectedRoute
          exact
          path="/auth"
          Component={<SignIn updateAvailable={updateAvailable} triggerUpdate={triggerUpdate} />}
          isAuthenticated={!Data.authenticated}
          redirectPath={'/home'}
        />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const mapStateToProps = (state: AppState): AppState => state;
export default connect(mapStateToProps)(Routes);
