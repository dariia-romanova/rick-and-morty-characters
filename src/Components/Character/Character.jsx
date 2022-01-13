import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { fectchEpisodes } from '../../api/episodes';

import './Character.scss';

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
    <Card className="Character">
      <CardMedia
        className="Character__image"
        component="img"
        image={character.image}
        alt={character.name}
      />
      <CardContent
        className="Character__info"
        sx={{ padding: 0 }}
      >
        <Typography variant="h3" gutterBottom>
          {character.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          <span className="Character__species">{character.species}</span>
          <span>{character.gender}</span>
        </Typography>
        {episodes.length && (
          <Typography variant="body1" gutterBottom>
            <span className="Character__info-title">{'Episodes: '}</span>
            {episodes.map((episode) => (
              <span key={episode.id} className="Character__episode">
                <span className="Character__episode-code">
                  {episode.episode}
                </span>
                {` ${episode.name}`}
              </span>
            ))}
          </Typography>
        )}
        <Typography variant="body1" gutterBottom>
          <span className="Character__info-title">
            {'Location: '}
          </span>
          {character.location.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="Character__info-title">
            {'Status: '}
          </span>
          {character.status}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="Character__info-title">
            {'Created: '}
          </span>
          {character.created.split('T')[0]}
        </Typography>
      </CardContent>
    </Card>
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
