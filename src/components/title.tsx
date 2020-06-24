import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-weight: 500;
  color: ${(p) => p.theme.colour.primary01};
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  -webkit-appearance: none;
  ::placeholder {
    color: ${(p) => p.theme.colour.primary03};
  }
  box-sizing: border-box;
  margin-right: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

type Props = {
  value: string;
  onChange(input: string): void;
};

const TitleInput: FC<Props> = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [input, setInput] = useState(value);
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    setInput(value);
  }, [value]);

  const onblur = () => {
    onChange(input);
  };

  const iconClick = () => {
    (inputRef.current! as HTMLInputElement).focus();
  };

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.setSelectionRange(event.target.value.length, event.target.value.length);
  };

  return (
    <Container>
      <Input
        ref={inputRef}
        onChange={onInput}
        value={input}
        onBlur={onblur}
        placeholder={'Fight name'}
        onFocus={onFocus}
        spellCheck={false}
      />
      <img src={'/assets/Edit.svg'} onClick={iconClick} />
    </Container>
  );
};

export default TitleInput;
