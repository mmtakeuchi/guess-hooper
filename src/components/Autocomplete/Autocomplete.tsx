import React, { useState, useEffect } from 'react';
import Input from '../Input/Input';
import { IPlayer } from '../../types/types';
import { fetchNames, fullName } from '../../utils';
import './Autocomplete.scss';

const Autocomplete = () => {
  const [searchedPlayers, setSearchedPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [hidden, setHidden] = useState(true);

  const choosePlayer = (player: IPlayer) => {
    const convertToFullName = fullName(player.first_name, player.last_name);
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
      {searchedPlayers.length && !hidden && (
        <ul className="autocomplete-list">
          {searchedPlayers.map((player: IPlayer) => (
            <li
              key={player.id}
              onClick={() => choosePlayer(player)}
            >{`${player.first_name} ${player.last_name}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
