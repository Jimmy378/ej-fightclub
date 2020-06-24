import React, { FC, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 70px;
  width: 84px;
  position: relative;
  box-sizing: border-box;
`;

const SVG = styled.div`
  position: absolute;
  height: 70px;
  width: 84px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Angled = styled.svg<{ active: boolean }>`
  height: 70px;
  width: 84px;
  fill: ${(p) => (p.active ? p.theme.colour.secondary03 : p.theme.colour.secondary01)};
`;

const ScoreInput = styled.input<{ active: boolean }>`
  height: 70px;
  width: 84px;
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
  height: 70px;
  width: 84px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  update(input: number): void;
  flipped: boolean;
  value: number;
  disabled: boolean;
};

const ScoreTab: FC<Props> = ({ update, flipped, value, disabled }) => {
  const [score, setScore] = useState<number | string>(value);
  const [active, setActive] = useState(false);

  const scoreUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (Number.isNaN(value)) {
      setScore('');
    } else {
      setScore(value);
    }
    if (value > 0) {
      update(value);
    }
  };

  const jamesBlur = () => {
    setActive(false);
    if (score === '') {
      setScore(value);
    }
  };

  const JamesFocus = () => {
    setScore('');
    setActive(true);
  };

  return (
    <Container>
      <SVG>
        <Angled active={active}>
          {flipped ? <polygon points="14 0 84 0 84 70 0 70 14 0" /> : <polygon points="70 70 0 70 0 0 84 0 70 70" />}
        </Angled>
      </SVG>
      <ScoreBox>
        <ScoreInput
          inputMode="numeric"
          pattern="[0-9]*"
          type={'number'}
          value={score}
          onChange={scoreUpdate}
          onBlur={jamesBlur}
          onFocus={JamesFocus}
          active={active}
          disabled={disabled}
        />
      </ScoreBox>
    </Container>
  );
};

export default ScoreTab;
