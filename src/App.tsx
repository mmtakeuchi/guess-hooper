import React, { useState, useEffect } from 'react';
import { players } from './data/players';
import { IPlayerData } from './types/index';
import { pickPlayer } from './utils';
import { addGameStats, loadGameStats } from './utils/storage';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Footer from './components/Footer/Footer';
import HooperList from './components/HooperList/HooperList';
import Navbar from './components/Navbar/Navbar';
import Result from './components/Result/Result';
import './App.css';

const App = () => {
  const [guesses, setGuesses] = useState<IPlayerData[]>([]);
  const [secretHooper, setSecretHooper] = useState<IPlayerData | null>(null);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    winPercentage: 0,
  });
  const [correctGuess, setCorrectGuess] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const correctHooper = (player?: IPlayerData) => {
    if (player?.personId === secretHooper?.personId) {
      setCorrectGuess(true);
      addGameStats(stats, true);
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
    setCorrectGuess(false);
    setShowSecret(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const getStats = () => {
      let stats = loadGameStats();
      setStats(stats);
    };

    getStats();
  }, []);

  useEffect(() => {
    getSecretHooper();
  }, []);

  useEffect(() => {
    const checkPlaying = () => {
      let isActive = guesses.length < 8 && !correctGuess;
      setIsPlaying(isActive);
      if (isActive === false && !correctGuess) {
        addGameStats(stats, false);
      }
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
