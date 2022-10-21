import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
  useLayoutEffect,
} from 'react';
import { fetchNames, filterNames, fullName } from '../../utils';
import { IInputProps } from '../../types';
import './Input.scss';

const Input = ({
  selectedPlayer,
  setSearchedPlayers,
  hidden,
  setHidden,
}: IInputProps) => {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    const convertToFullName =
      selectedPlayer === null
        ? ''
        : fullName(selectedPlayer.firstName, selectedPlayer.lastName);

    setSearch(convertToFullName);
  }, [selectedPlayer]);

  useLayoutEffect(() => {
    if (search !== '' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  return (
    <input
      ref={inputRef}
      type="text"
      autoComplete="off"
      placeholder="Guess the hooper"
      value={search}
      onChange={handleInput}
    />
  );
};

export default Input;
