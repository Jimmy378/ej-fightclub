import { IonPage } from '@ionic/react';
import React from 'react';
import { AppState } from 'store/state';
import { connect } from 'react-redux';
import { ConnectedReduxThunkProps } from 'store';
import { useFirebase } from 'react-redux-firebase';
import styled from 'styled-components';
import GoogleButton from 'components/googleButton';
import Update from 'components/update';

const Mobile = styled.div`
  min-height: 100vh;
  height: 100vh;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  box-sizing: border-box;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 70px;
`;

const Logo = styled.img`
  width: 100%;
`;

const Divider = styled.div`
  height: 50px;
`;

const ButtonContainer = styled.div`
  padding: 20px;
`;

type Props = { updateAvailable: boolean; triggerUpdate(): void } & AppState & ConnectedReduxThunkProps;

const SignIn: React.FC<Props> = ({ updateAvailable, triggerUpdate }) => {
  const firebase = useFirebase();

  const login = async () => {
    firebase.login({ provider: 'google', type: 'popup' });
  };

  return (
    <IonPage>
      <Mobile>
        <ButtonContainer>{updateAvailable && <Update onClick={triggerUpdate} />}</ButtonContainer>
        <Container>
          <Logo src={'/assets/logo/FightclubVert.svg'} />
          <Divider />
          <GoogleButton onClick={login} />
        </Container>
      </Mobile>
    </IonPage>
  );
};

const mapStateToProps = (state: AppState): AppState => state;
export default connect(mapStateToProps)(SignIn);
