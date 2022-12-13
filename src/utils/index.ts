import axios from 'axios';
import { players } from '../data/players';
import { teams } from '../data/teams';
import { IPlayer, IPlayerData, ITeamData, IPlayersTeamData } from '../types';

export const fetchNames = async (name?: string) => {
  const baseUrl = 'https://www.balldontlie.io/api/v1/players?per_page=5';

  const response = await axios.get(
    name?.length ? `${baseUrl}&search=${name}` : baseUrl
  );

  const data = await response.data.data;

  return data;
};

export const availableHeight = (player: IPlayerData) => {
  const height = player.heightFeet && player.heightInches ? true : false;

  return height;
};

export const isValidHooper = (hooper: IPlayerData) => {
  return hooper && availableHeight(hooper) && hooper.teams.length > 0;
};

export const fetchPlayer = async () => {
  const randomNum = Math.floor(Math.random() * 1000);
  const baseUrl = 'https://www.balldontlie.io/api/v1/players';

  const response = await axios.get(`${baseUrl}/${randomNum}`);
  const player = await response.data;

  if (isValidHooper(player)) {
    return player;
  } else {
    fetchPlayer();
  }
};

const randomNum = (list: []) => {
  return Math.floor(Math.random() * list.length);
};

export const pickPlayer = (players: IPlayerData[] | any) => {
  let randomIndex = randomNum(players);
  let player = players[randomIndex];

  while (!isValidHooper(player)) {
    randomIndex = randomNum(players);
    player = players[randomIndex];

    pickPlayer(players);
  }

  return player;
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

export const compareNumbers = (
  guessNum: string | undefined,
  secretNum: string | undefined
) => {
  let dif = Math.abs(Number(guessNum) - Number(secretNum));

  if (dif === 0) {
    return ' correct';
  } else if (dif <= 2) {
    return ' close';
  } else {
    return '';
  }
};

export const compareHeights = (
  guessHeight: (string | undefined)[],
  secretHeight: (string | undefined)[]
) => {
  let guessHooperHeight = (
    Number(guessHeight[0]) * 12 +
    Number(guessHeight[1])
  ).toString();
  let secretHooperHeight = (
    Number(secretHeight[0]) * 12 +
    Number(secretHeight[1])
  ).toString();

  return compareNumbers(guessHooperHeight, secretHooperHeight);
};

export const compareTeams = (
  guessTeam: string | undefined,
  secretCurrentTeam: string | undefined,
  secretTeams:
    | {
        teamId: string;
        seasonStart: string;
        seasonEnd: string;
      }[]
    | undefined
) => {
  if (guessTeam === secretCurrentTeam) return ' correct';
  if (secretTeams) {
    let secrets = secretTeams?.map((team: any) => team.teamId);

    if (guessTeam === secrets[secrets.length - 1]) {
      return ' correct';
    } else if (secrets.includes(guessTeam)) {
      return ' close';
    } else {
      return '';
    }
  }
};

export const comparePos = (guessPos: string, secretPos: string | undefined) => {
  if (guessPos === secretPos) {
    return ' correct';
  } else if (
    secretPos?.includes(guessPos) ||
    (secretPos && guessPos.includes(secretPos))
  ) {
    return ' close';
  } else {
    return '';
  }
};

export const abbreviateDivision = (division: string | undefined) => {
  const divisions = {
    Pacific: 'PAC',
    Southeast: 'SE',
    Southwest: 'SW',
    Atlantic: 'ATL',
    Central: 'CEN',
    Northwest: 'NW',
  };

  type ObjectKey = keyof typeof divisions;

  const myVar = `${division}` as ObjectKey;

  return divisions[myVar];
};
