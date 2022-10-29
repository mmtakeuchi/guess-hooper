import React, { useState, FormEvent } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import { IPlayerData, IAutocompleteProps } from '../../types';

import './Autocomplete.scss';

const Autocomplete = ({ addGuess, secretHooper }: IAutocompleteProps) => {
  const [searchedPlayers, setSearchedPlayers] = useState<IPlayerData[] | any>(
    []
  );
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayerData | null>(
    null
  );
  const [hidden, setHidden] = useState(true);

  const choosePlayer = (player: IPlayerData) => {
    setSelectedPlayer(player);
    setHidden(true);
  };

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
      />

      {searchedPlayers.length > 0 && !hidden && (
        <ul className="autocomplete-list">
          {searchedPlayers.map((player: IPlayerData) => (
            <li
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
