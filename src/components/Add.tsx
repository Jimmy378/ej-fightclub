import React, { FC, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
`;

const Line = styled.line`
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
  stroke: ${(p) => p.theme.colour.white};
  fill: none;
`;

const Circle = styled.circle<{ touching: boolean }>`
  fill: ${(p) => (p.touching ? p.theme.colour.secondary03 : p.theme.colour.secondary02)};
`;

type Props = {
  onClick(): void;
};

const Add: FC<Props> = ({ onClick }) => {
  const [touching, setTouching] = useState(false);
  return (
    <Container
      onClick={onClick}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
      onTouchCancel={() => setTouching(false)}
    >
      <svg viewBox="0 0 60 60">
        <Circle touching={touching} cx="30" cy="30" r="30" />
        <Line x1="30" y1="14.36" x2="30" y2="45.64" />
        <Line x1="45.64" y1="30" x2="14.36" y2="30" />
      </svg>
    </Container>
  );
};

export default Add;
