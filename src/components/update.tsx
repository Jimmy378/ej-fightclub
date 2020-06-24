import React, { FC, useState } from 'react';
import styled from 'styled-components';

const Button = styled.div<{ touching: boolean }>`
  height: 50px;
  width: 100%;
  background-image: ${(p) =>
    p.touching
      ? `linear-gradient(${p.theme.colour.secondary03}, ${p.theme.colour.secondary03})`
      : `linear-gradient(${p.theme.colour.secondary02}, ${p.theme.colour.secondary03})`};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: relative;
  z-index: 10;
`;

const Text = styled.p`
  font-size: 25px;
  color: ${(p) => p.theme.colour.white};
  padding: 0;
  margin: 0;
`;

type Props = {
  onClick(): void;
};

const Update: FC<Props> = ({ onClick }) => {
  const [touching, setTouching] = useState(false);
  return (
    <Button
      onClick={onClick}
      touching={touching}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
      onTouchCancel={() => setTouching(false)}
    >
      <Text>UPDATE</Text>
    </Button>
  );
};

export default Update;
