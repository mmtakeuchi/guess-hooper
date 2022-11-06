import { GameStatsProps } from '../types';

const defaultStats: GameStatsProps = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  winPercentage: 0,
};

export const setStatsToLocalStorage = (gameStats: GameStatsProps) => {
  localStorage.setItem('gameStats', JSON.stringify(gameStats));
};

export const getStatsFromLocalStorage = () => {
  const stats = localStorage.getItem('gameStats');
  return stats ? JSON.parse(stats || '') : null;
};

export const loadGameStats = () => {
  return getStatsFromLocalStorage() || defaultStats;
};

export const addGameStats = (stats: GameStatsProps, win: boolean) => {
  stats.gamesPlayed += 1;

  if (win) {
    stats.gamesWon += 1;
    stats.currentStreak += 1;

    if (stats.currentStreak > stats.maxStreak) {
      stats.maxStreak = stats.currentStreak;
    }
  }

  stats.winPercentage = Math.round(
    (100 * stats.gamesWon) / Math.max(stats.gamesPlayed, 1)
  );

  setStatsToLocalStorage(stats);
  return stats;
};
