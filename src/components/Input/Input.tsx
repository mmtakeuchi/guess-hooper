import React, { useState, useEffect, ChangeEvent } from 'react';
import { IInputProps } from '../../types/types';
import './Input.scss';

const Input = ({
  selectedPlayer,
  setSelectedPlayer,
  hidden,
  setHidden,
}: IInputProps) => {
  console.log(selectedPlayer);
  const [search, setSearch] = useState(selectedPlayer);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setHidden(true);
  };

  useEffect(() => {
    setSearch(selectedPlayer);
  }, [selectedPlayer]);

  return (
    <input
      type="text"
      autoComplete="off"
      placeholder="Guess the hooper"
      value={search}
      onChange={handleInput}
    />
  );
};

export default Input;
