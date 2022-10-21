import React, { useState, useEffect } from 'react';
import { players } from './data/players';
import { IPlayer, IPlayerData } from './types/index';
import { fetchNames, fullName, pickPlayer, availableHeight } from './utils';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Footer from './components/Footer/Footer';
import HooperList from './components/HooperList/HooperList';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const App = () => {
  const [guesses, setGuesses] = useState<IPlayerData[]>([]);
  const [secrectHooper, setSecretHooper] = useState<IPlayerData | null>(null);

  const getSecretHooper = () => {
    const randomHooper = pickPlayer(players);
    setSecretHooper(randomHooper);
  };

  const addGuess = (selectedPlayer?: IPlayerData) => {
    console.log(guesses, selectedPlayer);
    selectedPlayer && setGuesses([...guesses, selectedPlayer]);
  };

  useEffect(() => getSecretHooper(), []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Autocomplete addGuess={addGuess} secrectHooper={secrectHooper} />
        {secrectHooper && (
          <h2>{fullName(secrectHooper?.firstName, secrectHooper?.lastName)}</h2>
        )}
        <HooperList guesses={guesses} secrectHooper={secrectHooper} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
