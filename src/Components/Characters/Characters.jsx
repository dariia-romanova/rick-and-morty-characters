import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Characters({ characters }) {
  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={characters.map((character) => character.name)}
        sx={{ width: 300 }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Characters" />}
      />
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <NavLink to={`/characters/${character.id}`}>
              <h2>{character.name}</h2>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

Characters.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Characters;
