import React, { useState } from 'react';
import Input from '../Input/Input';
import { IPlayer } from '../../types/types';
import { fullName } from '../../utils';
import './Autocomplete.scss';

const data = [
  { id: 1, first_name: 'Lebron', last_name: 'James' },
  { id: 2, first_name: 'Russell', last_name: 'Westbrook' },
  { id: 3, first_name: 'Anthony', last_name: 'Davis' },
  { id: 4, first_name: 'Patrick', last_name: 'Beverely' },
  { id: 5, first_name: 'Lonnie', last_name: 'Walker' },
];

const Autocomplete = () => {
  const [searchedPlayers, setSearchedPlayers] = useState<IPlayer[]>([...data]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [hidden, setHidden] = useState(false);

  console.log(selectedPlayer);
  const choosePlayer = (player: IPlayer) => {
    const convertToFullName = fullName(player.first_name, player.last_name);
    setSelectedPlayer(convertToFullName);
    setHidden(false);
  };

  return (
    <div className="autocomplete">
      <Input
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        hidden={hidden}
        setHidden={setHidden}
      />
      {hidden && (
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
