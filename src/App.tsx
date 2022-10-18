import React from 'react';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Autocomplete />
      </main>
      <Footer />
    </div>
  );
}

export default App;
