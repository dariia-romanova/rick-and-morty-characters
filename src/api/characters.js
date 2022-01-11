const BASE_URL = 'https://rickandmortyapi.com/api';

export function fectchCharacters() {
  return fetch(`${BASE_URL}/character`)
    .then((result) => result.json())
    .then((data) => data.results);
}

export default fectchCharacters;
