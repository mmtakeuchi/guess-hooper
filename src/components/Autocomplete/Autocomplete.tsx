import React, { useState, FormEvent, useEffect } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import { IPlayerData, IAutocompleteProps } from '../../types';

import './Autocomplete.scss';
import { act } from 'react-dom/test-utils';

const Autocomplete = ({
  guesses,
  addGuess,
  secretHooper,
}: IAutocompleteProps) => {
  const [searchedPlayers, setSearchedPlayers] = useState<IPlayerData[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayerData | null>(
    null
  );
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [hidden, setHidden] = useState(true);

  const choosePlayer = (player: IPlayerData) => {
    setSelectedPlayer(player);
    setHidden(true);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13 && searchedPlayers?.length) {
      setSelectedPlayer(searchedPlayers[activeSuggestion]);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion((prevActive) => prevActive - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion === searchedPlayers?.length - 1) {
        return;
      }
      setActiveSuggestion((prevActive) => prevActive + 1);
    }
  };

  useEffect(() => {
    const resetActive = () => {
      if (selectedPlayer !== null && !hidden) {
        setActiveSuggestion(0);
      }
    };

    resetActive();
  }, [selectedPlayer, hidden]);

  return (
    <div className="autocomplete">
      <SearchInput
        selectedPlayer={selectedPlayer}
        searchedPlayers={searchedPlayers}
        setSearchedPlayers={setSearchedPlayers}
        setSelectedPlayer={setSelectedPlayer}
        addGuess={addGuess}
        hidden={hidden}
        setHidden={setHidden}
        handleKeyDown={handleKeyDown}
      />

      {searchedPlayers.length > 0 && !hidden && (
        <ul className="autocomplete-list">
          {searchedPlayers.map((player: IPlayerData, i: number) => (
            <li
              className={`autocomplete-list-item ${
                activeSuggestion === i ? 'active' : ''
              }`}
              onKeyDown={handleKeyDown}
              key={player.personId}
              onClick={() => choosePlayer(player)}
            >{`${player.firstName} ${player.lastName}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
