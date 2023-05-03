import React, { useEffect } from 'react';

function MediaDetails(props) {
  const [media, setMedia] = React.useState(null);
  const [credits, setCredits] = React.useState(null);
  const [directors, setDirectors] = React.useState([]);
  const [writers, setWriters] = React.useState([]);
  const [stars, setStars] = React.useState([]);

  function getWritersAndDirectors(crew) {
    const directors = [];
    const writers = [];
    crew.forEach((person) => {
      if (person.job === 'Director') {
        directors.push(person);
      } else if (person.job === 'Writer') {
        writers.push(person);
      }
    });
    setDirectors(directors);
    setWriters(writers);
  }

  function getStars(cast) {
    const stars = [];
    for (let i = 0; i < 3; i++) {
      stars.push(cast[i]);
    }
    setStars(stars);
  }

  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  function getReleaseDate(media) {
    if (media.hasOwnProperty('first_air_date')) {
      if (media.hasOwnProperty('last_air_date')) {
        return `${media.first_air_date.split('-')[0]} - ${media.last_air_date.split('-')[0]}`;
      } else {
        return `${media.first_air_date.split('-')[0]} -`;
      }
    } else {
      return media.release_date.split('-')[0];
    }
  }

  function getRuntime(media) {
    if (media.hasOwnProperty('first_air_date')) {
      return `${Math.max(...media.episode_run_time)} min`;
    } else {
      return toHoursAndMinutes(media.runtime);
    }
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/1396?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US`,
      );
      const data = await response.json();
      setMedia(data);
    }
    fetchMovieDetails();
    async function fetchMovieCredits() {
      const response = await fetch(
        'https://api.themoviedb.org/3/tv/1396/credits?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US',
      );
      const data = await response.json();
      setCredits(data);
      getWritersAndDirectors(data.crew);
      getStars(data.cast);
    }
    fetchMovieCredits();
  }, []);

  if (media === null || credits === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="media">
        {media.hasOwnProperty('first_air_date') ? (
          <div>
            <h1>{media.name}</h1>
          </div>
        ) : (
          <div>
            <h1>{media.original_title}</h1>
          </div>
        )}
        <p>{getReleaseDate(media)}</p>
        <p>{getRuntime(media).toString()}</p>
        <img src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`} alt="media-poster" />
        <p id="overview">{media.overview}</p>
        {!media.hasOwnProperty('first_air_date') ? (
          <div>
            <h2>Director(s)</h2>
            {directors.map((director) => (
              <p key={director.id}>{director.name}</p>
            ))}
            <h2>Writer(s)</h2>
            {writers.map((writer) => (
              <p key={writer.id}>{writer.name}</p>
            ))}
          </div>
        ) : (
          <div>
            <h2>Creator</h2>
            <p>{media.created_by[0].name}</p>
          </div>
        )}
        <h2>Stars</h2>
        {stars.map((star) => (
          <p key={star.id}>{star.name}</p>
        ))}
        <button>Add to Watchlist</button>
        {media.hasOwnProperty('first_air_date') ? (
          <div>
            <h2>Episodes</h2>
            <p>{media.number_of_episodes}</p>
          </div>
        ): (
          <div></div>
        )}
      </div>
    );
  }
}

export default MediaDetails;
