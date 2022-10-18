import React from 'react';
import Footer from './components/Footer/Footer';
import Input from './components/Input/Input';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Input />
      </main>
      <Footer />
    </div>
  );
}

export default App;
