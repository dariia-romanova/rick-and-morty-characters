/* eslint-disable guard-for-in */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { fectchCharacters } from './api/characters';
import Characters from './Components/Characters/Characters';

function App() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const charactersList = await fectchCharacters();

    setCharacters(charactersList);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="App">
      <h1>Rick and Morty</h1>
      {characters.length && (
        <Routes>
          <Route path="/" element={<Characters characters={characters} />} />
          {characters.map((character) => (
            <Route
              key={character.id}
              path={`/characters/${character.id}`}
              element={<h2>{character.name}</h2>}
            />
          ))}
        </Routes>
      )}
    </div>
  );
}

export default App;
