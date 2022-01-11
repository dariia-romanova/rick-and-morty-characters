import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Characters({ characters }) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedCharacters, selectCharacters] = useState(characters);

  useEffect(() => {
    selectCharacters(characters.filter((character) => character.name === inputValue));

    if (!value) {
      selectCharacters(characters);
    }
  }, [value]);

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={characters.map((character) => character.name)}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        sx={{ width: 300 }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Characters" />}
      />
      <List>
        {selectedCharacters.map((character) => (
          <ListItem key={character.id}>
            <NavLink to={`/characters/${character.id}`}>
              <ListItemText
                primary={character.name}
                secondary={character.status}
              />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

Characters.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Characters;
