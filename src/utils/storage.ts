import { GameStatsProps } from '../types';

export const setStatsToLocalStorage = (gameStats: GameStatsProps) => {
  localStorage.setItem('gameStats', JSON.stringify(gameStats));
};

export const getStatsFromLocalStorage = () => {
  const stats = localStorage.getItem('gameStats');
  return stats ? JSON.parse(stats) : null;
};
