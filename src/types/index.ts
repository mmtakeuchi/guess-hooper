export interface IPlayer {
  id: number;
  first_name: string;
  last_name: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  position: string;
  team: {
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string;
  };
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

export interface ITeamData {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface ITeams {
  teams: ITeamData[];
}

export interface IPlayersTeamData {
  teamId: string;
  seasonStart: string;
  seasonEnd: string;
}

export interface IAutocompleteProps {
  secretHooper: IPlayerData | null;
  guesses: IPlayerData[] | [];
  addGuess: (selectedPlayer?: IPlayerData | any) => void;
}
export interface IInputProps {
  selectedPlayer: IPlayerData | null;
  searchedPlayers: IPlayerData[];
  addGuess: (selectedPlayer?: IPlayerData | any) => void;
  setSearchedPlayers: (players: IPlayerData[]) => void;
  setSelectedPlayer: (player: IPlayerData | null) => void;
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
  handleKeyDown: (e: any) => void;
}

export interface IHooperListProps {
  guesses: IPlayerData[];
  secretHooper: IPlayerData | null;
}

export interface IHooperItemProps {
  hooper: IPlayerData;
  secretHooper: IPlayerData | null;
}

export interface IResultProps {
  secretHooper: IPlayerData | null;
  correct: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isPlaying: boolean;
}
