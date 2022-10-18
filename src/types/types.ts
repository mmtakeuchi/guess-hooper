export interface IPlayer {
  id: number;
  first_name: string;
  last_name: string;
}

export interface IInputProps {
  selectedPlayer?: string;
  setSearchedPlayers: (players: IPlayer[]) => void;
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}
