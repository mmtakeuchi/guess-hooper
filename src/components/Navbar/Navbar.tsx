import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import StatsModal from '../StatsModal/StatsModal';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  return (
    <header>
      <h1>Guess Hooper</h1>
      <div className="nav-btns">
        <button className="stats-btn" onClick={() => setIsStatsOpen(true)}>
          Stats
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-help"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setIsOpen(true)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="12" cy="12" r="9"></circle>
          <line x1="12" y1="17" x2="12" y2="17.01"></line>
          <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"></path>
        </svg>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      {isStatsOpen && <StatsModal setIsStatsOpen={setIsStatsOpen} />}
    </header>
  );
};

export default Navbar;
