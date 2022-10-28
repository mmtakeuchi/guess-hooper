import React, { useState, useEffect } from 'react';
import { IResultProps } from '../../types';
import { fullName } from '../../utils';
import './Result.scss';

const Result = ({ correct, secretHooper, setIsOpen }: IResultProps) => {
  useEffect(() => {
    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscapeKeyDown);

    return () => window.removeEventListener('keydown', closeOnEscapeKeyDown);
  }, [setIsOpen]);

  return (
    <div className="result" onClick={() => setIsOpen(false)}>
      <div className="result-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="closeBtn"
          aria-label="close"
          onClick={() => setIsOpen(false)}
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
        <div className="result-box-content">
          <img
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${secretHooper?.personId}.png`}
            alt="hooper headshot"
          />

          <div className="result-box-content-info">
            <h3>
              {correct ? 'Congratulations!' : 'Sorry, the correct answer is'}
            </h3>
            <h2>{fullName(secretHooper?.firstName, secretHooper?.lastName)}</h2>
          </div>

          <div className="result-box-content-timer">
            <h3>Next hooper in 12:00:00</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
