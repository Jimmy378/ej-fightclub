import React, { FC, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ touching: boolean }>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: ${(p) => p.theme.borderRadius.primary};
  overflow: hidden;
  background-image: ${(p) =>
    p.touching
      ? `linear-gradient(${p.theme.colour.secondary03}, ${p.theme.colour.secondary03})`
      : `linear-gradient(${p.theme.colour.secondary02}, ${p.theme.colour.secondary03})`};
  box-sizing: border-box;
  border: 2px solid ${(p) => p.theme.colour.secondary02};
`;

const GoogleIcon = styled.div`
  width: 50px;
  height: 100%;
  padding: 10px;
  background-color: white;
  > img {
    height: 100%;
    transform: translateX(2px);
  }
  box-sizing: border-box;
`;

const Button = styled.div`
  flex-grow: 1;
  > p {
    color: ${(p) => p.theme.colour.white};
    text-align: center;
  }
`;

type Props = {
  onClick(): void;
};

const GoogleButton: FC<Props> = ({ onClick }) => {
  const [touching, setTouching] = useState(false);
  return (
    <Container
      onClick={onClick}
      touching={touching}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
      onTouchCancel={() => setTouching(false)}
    >
      <GoogleIcon>
        <img src={'/assets/logo/Google.svg'} />
      </GoogleIcon>
      <Button>
        <p>Sign in</p>
      </Button>
    </Container>
  );
};

export default GoogleButton;
