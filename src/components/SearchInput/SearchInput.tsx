import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
  useLayoutEffect,
} from 'react';
import { filterNames, fullName } from '../../utils';
import { IInputProps } from '../../types';
import './SearchInput.scss';

const SearchInput = ({
  selectedPlayer,
  searchedPlayers,
  setSearchedPlayers,
  setSelectedPlayer,
  addGuess,
  hidden,
  setHidden,
  handleKeyDown,
}: IInputProps) => {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setHidden(false);
  };

  const searchPlayers = (playerName: string | undefined) => {
    if (playerName) {
      const filteredPlayers = filterNames(playerName);
      setSearchedPlayers(filteredPlayers);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPlayer && searchedPlayers.length > 0) {
      addGuess(searchedPlayers[0]);
    } else if (selectedPlayer) {
      addGuess(selectedPlayer);
    }

    setSearch('');
    setSelectedPlayer(null);
    setHidden(true);
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
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        autoComplete="off"
        placeholder="Guess the hooper"
        value={search}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default SearchInput;
