import axios from 'axios';
import { players } from '../data/players';
import { teams } from '../data/teams';
import { IPlayer, IPlayerData, ITeamData } from '../types';

export const fetchNames = async (name?: string) => {
  const baseUrl = 'https://www.balldontlie.io/api/v1/players?per_page=5';

  const response = await axios.get(
    name?.length ? `${baseUrl}&search=${name}` : baseUrl
  );

  const data = await response.data.data;

  return data;
};

export const availableHeight = (player: IPlayer) => {
  const height = player.height_feet && player.height_inches ? true : false;

  return height;
};

export const fetchPlayer = async () => {
  const randomNum = Math.floor(Math.random() * 1000);
  const baseUrl = 'https://www.balldontlie.io/api/v1/players';

  const response = await axios.get(`${baseUrl}/${randomNum}`);
  const player = await response.data;

  console.log(player);
  if (player !== undefined && availableHeight(player)) {
    return player;
  } else {
    fetchPlayer();
  }
};

export const filterNames = (name?: string) => {
  if (name?.length) {
    return players
      .filter((player: IPlayerData) => {
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

export const combineStrings = (...args: string[]) => {
  return args.join(' ');
};

export const calculateAge = (birthday: string | undefined) => {
  if (birthday !== undefined) {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
};

const randomNum = (list: []) => {
  return Math.floor(Math.random() * list.length);
};

export const pickPlayer = (players: IPlayerData[] | any) => {
  const randomIndex = randomNum(players);
  return players[randomIndex];
};

export const findTeam = (teamId: string | undefined) => {
  return teams.find((team: ITeamData) => team.id === Number(teamId));
};

export const getTeamLogo = (teamId: string) => {
  return `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;
};

export const compareHoopers = (
  hooper: string | undefined,
  secret: string | undefined
) => {
  return hooper === secret ? ' correct' : '';
};
