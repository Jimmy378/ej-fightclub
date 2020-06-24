import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IFight } from 'util/types';
import TitleInput from './title';
import { Gesture, useIonViewDidEnter, useIonViewDidLeave, createGesture, GestureDetail } from '@ionic/react';
import ScoreTab from './scoreTab';

const Container = styled.div`
  :not(:last-child) {
    border-bottom: 1px solid ${(p) => p.theme.colour.secondary01};
    margin-bottom: 14px;
  }
  position: relative;
`;

const FightContainer = styled.div<{ movement: number; isActive: boolean }>`
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  border-radius: ${(p) => p.theme.borderRadius.primary};
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  background-image: linear-gradient(
    ${(p) => `${p.theme.colour.primary01}, ${p.theme.colour.primary04}, ${p.theme.colour.primary01}`}
  );
  margin-bottom: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);
  transform: translateX(
    ${(p) => (p.isActive ? (p.movement > 0 ? p.movement : 0) - 100 : p.movement < 0 ? p.movement : 0)}px
  );
  position: relative;
  border-bottom: 3px solid ${(p) => p.theme.colour.red};
  transition: transform 0.1s ease-out;
`;

const DeleteContainer = styled.div`
  position: absolute;
  top: 0;
  transform: translateY(36px);
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  border-radius: ${(p) => p.theme.borderRadius.primary};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
`;

const DeleteButton = styled.div<{ deleteDown: boolean }>`
  height: 100%;
  width: 100%;
  background-color: ${(p) => (p.deleteDown ? p.theme.colour.redDark : p.theme.colour.red)};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteText = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-style: italic;
  color: ${(p) => p.theme.colour.secondary01};
  font-size: 20px;
  text-align: center;
  transform: translateX(5px);
  padding-right: 22px;
`;

const FightBG = styled.div`
  position: absolute;
  height: 70px;
  width: 100%;
  fill: black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Filler = styled.div`
  flex-grow: 1;
`;

const TextContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LetterBold = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 700;
  color: ${(p) => p.theme.colour.white};
  font-size: 30px;
  text-align: center;
`;

const LetterItalic = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-style: italic;
  color: ${(p) => p.theme.colour.secondary01};
  font-size: 25px;
  padding-right: 15px;
  padding-left: 15px;
  text-align: center;
`;

const ScoreInput = styled.input<{ active: boolean }>`
  width: 80%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-weight: 700;
  color: transparent;
  font-size: 30px;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  -webkit-appearance: none;
  text-shadow: 0 0 0 ${(p) => (p.active ? p.theme.colour.white : p.theme.colour.secondary02)};
  ::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

const ScoreBox = styled.div`
  width: 84px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Angled = styled.svg<{ active: boolean }>`
  height: 70px;
  width: 84px;
  fill: ${(p) => (p.active ? p.theme.colour.secondary03 : p.theme.colour.secondary01)};
`;

type Props = {
  fight: IFight;
  update(fight: IFight): void;
  remove(): void;
};

const Fight: FC<Props> = ({ fight, update, remove }) => {
  const fightContainerRef = useRef(null);
  const [swipeAmount, setSwipeAmount] = useState(0);
  const [deleteActive, setDeleteActive] = useState(false);

  useEffect(() => {
    const onMove = (event: GestureDetail) => {
      setSwipeAmount(event.deltaX);
    };

    const onEnd = (event: GestureDetail) => {
      if (event.deltaX < -80 || event.velocityX < -0.05) {
        setDeleteActive(true);
      } else if (event.deltaX > 80 || event.velocityX > 0.05) {
        setDeleteActive(false);
      }
      setSwipeAmount(0);
    };

    const gesture: Gesture = createGesture({
      el: fightContainerRef.current!,
      threshold: 15,
      gestureName: 'swipe',
      onMove: (ev) => onMove(ev),
      onEnd: (ev) => onEnd(ev),
    });

    gesture.enable();

    return () => {
      gesture.destroy();
    };
  }, []);

  const [ellaScore, setEllaScore] = useState<number | string>(fight.ellaScore);
  const [ellaScoreActive, setEllaScoreActive] = useState(false);
  const [jamesScore, setJamesScore] = useState<number | string>(fight.jamesScore);
  const [jamesScoreActive, setJamesScoreActive] = useState(false);

  const jamesUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (Number.isNaN(value)) {
      setJamesScore('');
    } else {
      setJamesScore(value);
    }
    if (value > 0) {
      update({ ...fight, jamesScore: value });
    }
  };

  const ellaUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (Number.isNaN(value)) {
      setEllaScore('');
    } else {
      setEllaScore(value);
    }
    if (value > 0) {
      update({ ...fight, ellaScore: value });
    }
  };

  useEffect(() => {
    setEllaScore(fight.ellaScore);
    setJamesScore(fight.jamesScore);
  }, [fight]);

  const jamesBlur = () => {
    setJamesScoreActive(false);
    if (jamesScore === '') {
      setJamesScore(fight.jamesScore);
    }
  };

  const ellaBlur = () => {
    setEllaScoreActive(false);
    if (ellaScore === '') {
      setJamesScore(fight.ellaScore);
    }
  };

  const titleChange = (input: string) => {
    update({ ...fight, title: input });
  };

  const [deleteDown, setDeleteDown] = useState(false);

  const JamesFocus = () => {
    setJamesScore('');
    setJamesScoreActive(true);
  };

  const EllaFocus = () => {
    setEllaScore('');
    setEllaScoreActive(true);
  };

  return (
    <Container>
      <DeleteContainer>
        <DeleteButton
          deleteDown={deleteDown}
          onClick={remove}
          onTouchStart={() => setDeleteDown(true)}
          onTouchEnd={() => setDeleteDown(false)}
          onTouchCancel={() => setDeleteDown(false)}
        >
          <DeleteText>Delete</DeleteText>
        </DeleteButton>
      </DeleteContainer>
      <TitleInput value={fight.title} onChange={titleChange} />
      <FightContainer movement={swipeAmount} ref={fightContainerRef} isActive={deleteActive}>
        <ScoreTab
          value={fight.ellaScore}
          flipped={false}
          disabled={deleteActive}
          update={(value) => update({ ...fight, ellaScore: value })}
        />
        <TextContainer>
          <LetterBold>E</LetterBold>
          <LetterItalic>vs</LetterItalic>
          <LetterBold>J</LetterBold>
        </TextContainer>
        <ScoreTab
          value={fight.jamesScore}
          flipped={true}
          disabled={deleteActive}
          update={(value) => update({ ...fight, jamesScore: value })}
        />
      </FightContainer>
    </Container>
  );
};

export default Fight;
