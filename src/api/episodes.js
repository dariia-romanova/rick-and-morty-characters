export function fectchEpisodes(episodes) {
  return Promise.all(episodes.map((episode) => fetch(episode)
    .then((result) => result.json())
    .then((data) => data)))
    .then((data) => data);
}

export default fectchEpisodes;
