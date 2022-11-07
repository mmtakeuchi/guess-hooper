import React, { useEffect } from 'react';
import './Modal.scss';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

const Modal = ({ setIsOpen }: Props) => {
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
    <div className="modal" onClick={() => setIsOpen(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
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
        <div className="modal-box-content">
          <h2>How To Play</h2>
          <h3>Guess the NBA player in 6 tries.</h3>
          <ul>
            <li>
              <span className="green">Green</span> in any column indicates a
              match!
            </li>
            <li>
              <span className="yellow">Yellow</span> in the team column
              indicates the mystery player at one point played for this team,
              but does not currently
            </li>
            <li>
              <span className="yellow">Yellow</span> in the position column
              indicates a partial match to the mystery player's position
            </li>
            <li>
              <span className="yellow">Yellow</span> in any other column
              indicates this attribute is within 2 (inches, years, numbers) of
              the mystery player
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
