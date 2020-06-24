import { IonPage } from '@ionic/react';
import React from 'react';
import { useFirestore, useFirestoreConnect, useFirebase } from 'react-redux-firebase';
import { AppState } from 'store/state';
import { connect } from 'react-redux';
import { ConnectedReduxThunkProps } from 'store';
import styled from 'styled-components';
import Fight from '../components/fight';
import Add from 'components/Add';
import { IFight } from 'util/types';
import Update from 'components/update';

const Mobile = styled.div`
  min-height: 100vh;
  height: 100vh;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  box-sizing: border-box;
  display: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Container = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 40px;
`;

const Filler = styled.div`
  flex-grow: 1;
`;

const LogoutButton = styled.div`
  padding: 30px;
  > p {
    text-align: center;
    font-size: 20px;
    color: rgb(200, 200, 200);
    padding: 0;
    margin: 0;
  }
`;

const Divider = styled.div`
  min-height: 20px;
  max-height: 20px;
`;

type Props = { updateAvailable: boolean; triggerUpdate(): void } & AppState & ConnectedReduxThunkProps;

const Home: React.FC<Props> = ({ firestore, updateAvailable, triggerUpdate }) => {
  const db = useFirestore();
  const auth = useFirebase();

  useFirestoreConnect(['fights']);

  const logout = () => {
    const confirm = window.confirm('Log out?');
    if (confirm) {
      auth.logout();
    }
  };

  const addFight = () => {
    db.add({ collection: 'fights' }, { title: '', ellaScore: 0, jamesScore: 0 });
  };

  const updateFight = (fight: IFight) => {
    db.update({ collection: 'fights', doc: fight.id }, fight);
  };

  const deleteFight = (id: string) => {
    const confirm = window.confirm('Delete?');
    if (confirm) {
      db.delete({ collection: 'fights', doc: id });
    }
  };

  return (
    <IonPage>
      <Mobile>
        <Container>
          {updateAvailable && <Update onClick={triggerUpdate} />}
          <Divider />
          <TopContainer>
            <Logo src={'/assets/logo/FightclubHoriz.svg'} />
            <Filler />
            <Add onClick={addFight} />
          </TopContainer>
          <Divider />
          {firestore.ordered.fights &&
            firestore.ordered.fights.map((fight) => (
              <Fight key={fight.id} fight={fight} update={updateFight} remove={() => deleteFight(fight.id)} />
            ))}
          <Filler />
          <LogoutButton onClick={logout}>
            <p>Log out</p>
          </LogoutButton>
        </Container>
      </Mobile>
    </IonPage>
  );
};

const mapStateToProps = (state: AppState): AppState => state;
export default connect(mapStateToProps)(Home);
