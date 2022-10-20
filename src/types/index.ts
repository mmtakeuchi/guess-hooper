export interface IPlayer {
  id: number;
  first_name: string;
  last_name: string;
}

export interface IPlayerData {
  firstName: string;
  lastName: string;
  temporaryDisplayName?: string;
  personId: string;
  teamId: string;
  jersey: string;
  isActive: boolean;
  pos: string;
  heightFeet: string;
  heightInches: string;
  heightMeters: string;
  weightPounds: string;
  weightKilograms: string;
  dateOfBirthUTC: string;
  teamSitesOnly?: {
    playerCode: string;
    posFull: string;
    displayAffiliation: string;
    freeAgentCode: string;
  };
  teams: {
    teamId: string;
    seasonStart: string;
    seasonEnd: string;
  }[];
  draft: {
    teamId: string;
    pickNum: string;
    roundNum: string;
    seasonYear: string;
  };
  nbaDebutYear: string;
  yearsPro: string;
  collegeName: string;
  lastAffiliation: string;
  country: string;
}

export interface IPlayerDataArr {
  players: IPlayerData[];
}

export interface IInputProps {
  selectedPlayer?: string;
  setSearchedPlayers: (players: IPlayerData[]) => void;
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

export interface IHooperListProps {
  guesses: IPlayer[];
  secretHooper: IPlayerData;
}
