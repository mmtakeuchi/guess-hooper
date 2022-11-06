import React, { useState, useEffect } from 'react';
import { getStatsFromLocalStorage } from '../../utils/storage';
import './StatsModal.scss';

interface Props {
  setIsStatsOpen: (value: boolean) => void;
}

const StatsModal = ({ setIsStatsOpen }: Props) => {
  const [stats, setStats] = useState(() => getStatsFromLocalStorage());
  console.log(stats);

  useEffect(() => {
    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsStatsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscapeKeyDown);

    return () => window.removeEventListener('keydown', closeOnEscapeKeyDown);
  }, [setIsStatsOpen]);

  return (
    <div className="stats-modal" onClick={() => setIsStatsOpen(false)}>
      <div className="stats-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="closeBtn"
          aria-label="close"
          onClick={() => setIsStatsOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-x"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="stats-modal-box-content">
          <h2>Stats</h2>
          <div className="stats-container">
            <div className="stats-container-item">
              <p className="stats-container-item_stat">{stats.gamesPlayed}</p>
              <p className="stats-container-item_name">Played</p>
            </div>
            <div className="stats-container-item">
              <p className="stats-container-item_stat">{stats.winPercentage}</p>
              <p className="stats-container-item_name">Win %</p>
            </div>
            <div className="stats-container-item">
              <p className="stats-container-item_stat">{stats.currentStreak}</p>
              <p className="stats-container-item_name">Current Streak</p>
            </div>
            <div className="stats-container-item">
              <p className="stats-container-item_stat">{stats.maxStreak}</p>
              <p className="stats-container-item_name">Max Streak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
