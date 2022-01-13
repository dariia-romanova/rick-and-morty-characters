import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  List,
  Avatar,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Autocomplete,
  TextField,
  IconButton,
  Button,
} from '@mui/material/';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';

import './Characters.scss';

function Characters({ characters, likeCharacter }) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedCharacters, selectCharacters] = useState(characters);
  const [isLikedShown, setLikedShown] = useState(false);

  useEffect(() => {
    if (value && !isLikedShown) {
      selectCharacters(characters.filter((character) => character.name === inputValue));
    } else if (value && isLikedShown) {
      selectCharacters(characters.filter((character) => (
        character.name === inputValue && character.favourite
      )));
    } else if (!value && isLikedShown) {
      selectCharacters(characters.filter((character) => character.favourite === true));
    } else {
      selectCharacters(characters);
    }
  }, [value, characters, isLikedShown]);

  return (
    <Box className="Characters">
      <Box className="Characters__autocomplete">
        <Autocomplete
          className="Characters__field"
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
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Characters" />}
        />
        <Box>
          <Button
            onClick={() => setLikedShown(false)}
            disabled={!isLikedShown}
          >
            All
          </Button>
          <Button
            onClick={() => setLikedShown(true)}
            disabled={isLikedShown}
          >
            Liked
          </Button>
        </Box>
      </Box>

      {selectedCharacters.length ? (
        <List
          className="Characters__list"
        >
          {selectedCharacters.map((character) => (
            <ListItem
              key={character.id}
              className="Characters__character"
              secondaryAction={(
                <IconButton
                  edge="end"
                  onClick={() => {
                    likeCharacter(character.id);
                  }}
                >
                  <FavoriteIcon
                    color={character.favourite ? 'primary' : ''}
                    sx={!character.favourite ? { color: '#ddd' } : {}}
                  />
                </IconButton>
              )}
            >
              <ListItemAvatar>
                <Avatar alt={character.name} src={character.image} />
              </ListItemAvatar>
              <NavLink to={`/rick-and-morty-characters/characters/${character.id}`} className="Characters__link">
                <ListItemText
                  primary={character.name}
                  secondary={character.status}
                />
              </NavLink>
            </ListItem>
          ))}
        </List>
      ) : (
        <p className="Characters__message">No characters were found</p>
      )}
    </Box>
  );
}

Characters.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
  likeCharacter: PropTypes.func.isRequired,
};

export default Characters;
