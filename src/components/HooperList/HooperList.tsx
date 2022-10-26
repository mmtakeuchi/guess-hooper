import React from 'react';
import HooperItem from '../HooperItem/HooperItem';
import { IHooperListProps, IPlayerData } from '../../types';
import './HooperList.scss';

const HooperList = ({ guesses, secrectHooper }: IHooperListProps) => {
  return (
    <table className="hooper-list">
      <thead>
        <tr className="hooper-list-headers">
          <th>Player</th>
          <th>Team</th>
          <th>Conf</th>
          <th>Div</th>
          <th>Pos</th>
          <th>HT</th>
          <th>Age</th>
          <th>#</th>
        </tr>
      </thead>
      {guesses.length > 0 && (
        <tbody>
          {guesses?.map((player: IPlayerData) => {
            console.log(player);
            return (
              <HooperItem
                hooper={player}
                secrectHooper={secrectHooper}
                key={player.personId}
              />
            );
          })}
        </tbody>
      )}
    </table>
  );
};

export default HooperList;
