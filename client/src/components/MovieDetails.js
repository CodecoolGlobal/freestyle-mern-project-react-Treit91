import React, { useEffect } from 'react';

function MovieDetails(props) {
  const [movie, setMovie] = React.useState(null);
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

  function getReleaseDate(movie) {
    if (movie.hasOwnProperty('first_air_date')) {
      if (movie.hasOwnProperty('last_air_date')) {
        return `${movie.first_air_date.split('-')[0]} - ${movie.last_air_date.split('-')[0]}`;
      } else {
        return `${movie.first_air_date.split('-')[0]} -`;
      }
    } else {
      return movie.release_date.split('-')[0];
    }
  }

  function getRuntime(movie) {
    if (movie.hasOwnProperty('first_air_date')) {
      return `${Math.max(...movie.episode_run_time)} min`;
    } else {
      return toHoursAndMinutes(movie.runtime);
    }
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/1396?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US`,
      );
      const data = await response.json();
      setMovie(data);
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

  if (movie === null || credits === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="movie">
        {movie.hasOwnProperty('first_air_date') ? (
          <div>
            <h1>{movie.name}</h1>
          </div>
        ) : (
          <div>
            <h1>{movie.original_title}</h1>
          </div>
        )}
        <p>{getReleaseDate(movie)}</p>
        <p>{getRuntime(movie).toString()}</p>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie-poster" />
        <p id="overview">{movie.overview}</p>
        {!movie.hasOwnProperty('first_air_date') ? (
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
            <p>{movie.created_by[0].name}</p>
          </div>
        )}
        <h2>Stars</h2>
        {stars.map((star) => (
          <p key={star.id}>{star.name}</p>
        ))}
        <button onClick={props.onClick}>Add to Watchlist</button>
      </div>
    );
  }
}

export default MovieDetails;
