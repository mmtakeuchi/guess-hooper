import axios from 'axios';
import { players } from '../data/players';
import { IPlayerData } from '../types';

export const fetchNames = async (name?: string) => {
  const baseUrl = 'https://www.balldontlie.io/api/v1/players?per_page=5';

  const response = await axios.get(
    name?.length ? `${baseUrl}&search=${name}` : baseUrl
  );

  const data = await response.data.data;

  return data;
};

export const filterNames = (name?: string) => {
  if (name?.length) {
    return players
      .filter((player) => {
        let playerFullName = fullName(player.firstName, player.lastName);

        return (
          playerFullName.toLowerCase().includes(name) ||
          playerFullName.toLowerCase().includes(name)
        );
      })
      .slice(0, 5);
  }

  return [];
};

export const fullName = (first?: string, last?: string) => {
  return `${first} ${last}`;
};

const randomNum = (list: []) => {
  return Math.floor(Math.random() * list.length);
};

export const pickPlayer = (players: IPlayerData[] | any) => {
  const randomIndex = randomNum(players);
  return players[randomIndex];
};

export const availableHeight = (player: IPlayerData) => {
  const height = player.heightFeet && player.heightInches ? true : false;

  return height;
};
