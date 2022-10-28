import React, { useState, useEffect } from 'react';
import { players } from './data/players';
import { IPlayerData } from './types/index';
import { fullName, pickPlayer, findTeam } from './utils';
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

  const correctHooper = (player?: IPlayerData) => {
    if (player?.personId === secretHooper?.personId) {
      setCorrectGuess(true);
    }
  };

  const addGuess = (selectedPlayer?: IPlayerData) => {
    selectedPlayer && setGuesses([...guesses, selectedPlayer]);
    correctHooper(selectedPlayer);
  };

  useEffect(() => {
    const getSecretHooper = () => {
      const randomHooper = pickPlayer(players);

      setSecretHooper(randomHooper);
    };

    getSecretHooper();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        {correctGuess && (
          <div>
            <p>{`You solved it in ${guesses.length} guesses.`}</p>
            <p>{`Secret player was: ${fullName(
              secretHooper?.firstName,
              secretHooper?.lastName
            )}`}</p>
          </div>
        )}
        <Autocomplete addGuess={addGuess} secretHooper={secretHooper} />
        {secretHooper && (
          <h2>{fullName(secretHooper?.firstName, secretHooper?.lastName)}</h2>
        )}
        {!showSecret ? (
          <button onClick={() => setShowSecret(!showSecret)}>
            Show Secret
          </button>
        ) : (
          <Result
            correct={correctGuess}
            secretHooper={secretHooper}
            setIsOpen={setShowSecret}
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
