/* eslint-disable guard-for-in */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './App.scss';
import { fectchCharacters } from './api/characters';
import Header from './Components/Header/Header';
import Characters from './Components/Characters/Characters';
import Character from './Components/Character/Character';

function App() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const charactersList = await fectchCharacters();

    const charactersWithLikes = charactersList.map((character) => (
      {
        ...character,
        favourite: false,
      }
    ));

    setCharacters(charactersWithLikes);
  };

  const likeCharacter = (id) => {
    const updatedCharacters = characters.map((character) => {
      if (id === character.id) {
        return {
          ...character,
          favourite: !character.favourite,
        };
      }

      return character;
    });

    setCharacters(updatedCharacters);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <Box className="App">
      <Header />

      {characters.length ? (
        <Routes>
          <Route exact path="/rick-and-morty-characters" element={<Characters characters={characters} likeCharacter={likeCharacter} />} />
          {characters.map((character) => (
            <Route
              key={character.id}
              path={`/rick-and-morty-characters/characters/${character.id}`}
              element={<Character character={character} />}
            />
          ))}
        </Routes>
      ) : (
        <CircularProgress sx={{ margin: '0 auto', display: 'flex' }} />
      )}
    </Box>
  );
}

export default App;
