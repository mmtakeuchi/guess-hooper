import React, { useState, useEffect } from 'react';
import Input from '../Input/Input';
import { IPlayer, IPlayerData } from '../../types';
import { fetchNames, fullName, pickPlayer } from '../../utils';
import { players } from '../../data/players';
import './Autocomplete.scss';

const Autocomplete = () => {
  const [searchedPlayers, setSearchedPlayers] = useState<IPlayerData[] | any>(
    []
  );
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [hidden, setHidden] = useState(true);

  const choosePlayer = (player: IPlayerData) => {
    const convertToFullName = fullName(player.firstName, player.lastName);
    setSelectedPlayer(convertToFullName);
    setHidden(true);
  };

  return (
    <div className="autocomplete">
      <Input
        selectedPlayer={selectedPlayer}
        setSearchedPlayers={setSearchedPlayers}
        hidden={hidden}
        setHidden={setHidden}
      />
      {searchedPlayers.length > 0 && (
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
