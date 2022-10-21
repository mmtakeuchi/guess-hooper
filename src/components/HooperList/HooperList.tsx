import React, { useEffect } from 'react';
import { IHooperListProps, IPlayerData } from '../../types';
import './HooperList.scss';

const HooperList = ({ guesses, secrectHooper }: IHooperListProps) => {
  console.log(guesses);
  return (
    <div>
      {guesses.length > 0 && (
        <ul>
          {guesses.map((player: IPlayerData) => {
            console.log(player);
            return <li key={player.personId}>{player.firstName}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default HooperList;
