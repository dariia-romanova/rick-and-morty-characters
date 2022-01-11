/* eslint-disable guard-for-in */
import React, { useEffect, useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';
import './App.css';
import { fectchCharacters } from './api/characters';
import Characters from './Components/Characters/Characters';
import Character from './Components/Character/Character';

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <NavLink to="/">
              <Typography variant="h6" component="div">
                Rick and Morty Characters
              </Typography>
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>

      {characters.length ? (
        <Routes>
          <Route path="/" element={<Characters characters={characters} />} />
          {characters.map((character) => (
            <Route
              key={character.id}
              path={`/characters/${character.id}`}
              element={<Character character={character} />}
            />
          ))}
        </Routes>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;
