import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { fectchEpisodes } from '../../api/episodes';

function Character({ character }) {
  const [episodes, setEpisodes] = useState([]);

  const getEpisodes = async () => {
    const allEpisodes = await fectchEpisodes(character.episode);

    setEpisodes(allEpisodes);
  };

  useEffect(() => {
    getEpisodes();
  }, []);

  return (
    <Box>
      <Typography variant="h2" component="div" gutterBottom>
        {character.name}
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        {character.species}
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        {character.gender}
      </Typography>
      {episodes.length && (
        <Typography variant="body1" component="div" gutterBottom>
          Episodes
          {episodes.map((episode) => (
            <>
              <p>{episode.episode}</p>
              <p>{episode.name}</p>
            </>
          ))}
        </Typography>
      )}
      <Typography variant="body1" component="div" gutterBottom>
        Location:
        {character.location.name}
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        {character.status}
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        {character.created}
      </Typography>
    </Box>
  );
}

Character.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    species: PropTypes.string,
    gender: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    image: PropTypes.string,
    episode: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    created: PropTypes.string,
  }).isRequired,
};

export default Character;
