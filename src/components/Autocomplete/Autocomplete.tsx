import React, { useState, FormEvent } from 'react';
import Input from '../Input/Input';
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPlayer && searchedPlayers.length > 0) {
      addGuess(searchedPlayers[0]);
    } else if (selectedPlayer) {
      addGuess(selectedPlayer);
    }

    setSelectedPlayer(null);
    setHidden(true);
  };

  return (
    <div className="autocomplete">
      <form onSubmit={handleSubmit}>
        <Input
          selectedPlayer={selectedPlayer}
          setSearchedPlayers={setSearchedPlayers}
          hidden={hidden}
          setHidden={setHidden}
        />
      </form>

      {searchedPlayers && !hidden && (
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
