import { useEffect, useState } from 'react';
import './App.css';
import { fectchCharacters } from './api/characters';

function App() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async() => {
    const charactersList = await fectchCharacters();

    setCharacters(charactersList);
    console.log(characters);
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="App">
      <h1>Rick and Morty</h1>
    {characters.length && (
        <ul>
          {characters.map((character) => (
            <li key={character.id}>{character.name}</li>
          ))}
      </ul>
    )}
    </div>
  );
}

export default App;
