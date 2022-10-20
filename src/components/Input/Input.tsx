import React, { useState, useEffect, ChangeEvent } from 'react';
import { fetchNames, filterNames } from '../../utils';
import { IInputProps } from '../../types';
import './Input.scss';

const Input = ({
  selectedPlayer,
  setSearchedPlayers,
  hidden,
  setHidden,
}: IInputProps) => {
  const [search, setSearch] = useState(selectedPlayer);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setHidden(false);
  };

  const searchPlayers = (playerName: string | undefined) => {
    const filteredPlayers = filterNames(playerName);
    setSearchedPlayers(filteredPlayers);
  };

  useEffect(() => {
    searchPlayers(search);
  }, [search]);

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
