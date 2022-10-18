import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { fetchNames } from '../../utils';
import { IInputProps } from '../../types/types';
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

  const searchPlayers = async (playerName: string | undefined) => {
    const names = await fetchNames(playerName);
    setSearchedPlayers(names);
  };

  useEffect(() => {
    searchPlayers(search);
  }, [search]);

  useEffect(() => {
    if (!search) {
      setHidden(true);
    }
  }, [search, setHidden]);

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
