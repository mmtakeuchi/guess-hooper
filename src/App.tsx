import React, { useState, useEffect } from 'react';
import { players } from './data/players';
import { IPlayerData, GameStatsProps } from './types/index';
import { fullName, pickPlayer, findTeam } from './utils';
import { setStatsToLocalStorage } from './utils/storage';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Footer from './components/Footer/Footer';
import HooperList from './components/HooperList/HooperList';
import Navbar from './components/Navbar/Navbar';
import Result from './components/Result/Result';
import './App.css';

const App = () => {
  const [guesses, setGuesses] = useState<IPlayerData[]>([]);
  const [secretHooper, setSecretHooper] = useState<IPlayerData | null>(null);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const correctHooper = (player?: IPlayerData) => {
    if (player?.personId === secretHooper?.personId) {
      setCorrectGuess(true);
    }
  };

  const addGuess = (selectedPlayer?: IPlayerData) => {
    selectedPlayer && setGuesses([...guesses, selectedPlayer]);
    correctHooper(selectedPlayer);
  };

  const getSecretHooper = () => {
    const randomHooper = pickPlayer(players);

    setSecretHooper(randomHooper);
  };

  const newGame = () => {
    setGuesses([]);
    getSecretHooper();
    setShowSecret(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    getSecretHooper();
  }, []);

  useEffect(() => {
    const checkPlaying = () => {
      let isActive = guesses.length < 8 && !correctGuess;
      setIsPlaying(isActive);
      if (isActive === false || correctGuess) {
        setShowSecret(true);
      }
    };

    checkPlaying();
  }, [guesses]);

  return (
    <div className="App">
      <Navbar />
      <main>
        {isPlaying && (
          <Autocomplete
            guesses={guesses}
            addGuess={addGuess}
            secretHooper={secretHooper}
          />
        )}

        {!showSecret ? (
          <button
            className="result-btn"
            onClick={() => setShowSecret(!showSecret)}
          >
            {isPlaying ? 'Show Hint' : 'Results'}
          </button>
        ) : (
          <Result
            correct={correctGuess}
            secretHooper={secretHooper}
            setShowSecret={setShowSecret}
            isPlaying={isPlaying}
            newGame={newGame}
          />
        )}
        {guesses.length > 0 && (
          <HooperList guesses={guesses} secretHooper={secretHooper} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
