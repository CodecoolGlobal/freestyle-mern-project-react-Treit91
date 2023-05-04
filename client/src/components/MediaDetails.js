import React, { useEffect } from 'react';
import Episodes from './Episodes';

function MediaDetails(props) {
  const [media, setMedia] = React.useState(null);
  const [credits, setCredits] = React.useState(null);
  const [directors, setDirectors] = React.useState([]);
  const [writers, setWriters] = React.useState([]);
  const [stars, setStars] = React.useState([]);
  const [movietitle, setMovieTitle] = React.useState([]);
  const [runtimeIfNoRuntimeInfo, setRuntimeIfNoRuntimeInfo] = React.useState(null);

  const mediatype = props.media_type;
  const id = props.movieID;
  const IsLoggedIn = props.IsLoggedIn;
  const signUp = props.IsSignnedUp;
  const episodesClicked = props.episodesClicked;

  function addToWatchList(userID_or_name_idk) {
    mediatype === 'tv' ? setMovieTitle(media.original_title) : setMovieTitle(media.name);
  }

  function getWritersAndDirectors(crew) {
    const directors = [];
    const writers = [];
    crew.forEach((person) => {
      if (person.job === 'Director') {
        directors.push(person);
      } else if (person.job === 'Writer' || person.job === 'Screenplay') {
        writers.push(person);
      }
    });
    setDirectors(directors);
    setWriters(writers);
  }

  function getStars(cast) {
    const stars = [];
    for (let i = 0; i < 3; i++) {
      if (cast[i] === undefined) {
        break;
      }
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
      if (media.status === 'Ended') {
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
      if (media.episode_run_time.length === 0) {
        return `${runtimeIfNoRuntimeInfo} min`;
      } else {
        return `${Math.max(...media.episode_run_time)} min`;
      }
    } else {
      return toHoursAndMinutes(media.runtime);
    }
  }

  useEffect(() => {
    async function fetchRuntime() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/1?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US`,
      );
      const data = await response.json();
      setRuntimeIfNoRuntimeInfo(data.episodes[0].runtime);
    }
    fetchRuntime();
    async function fetchMovieDetails() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediatype}/${id}?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US`,
      );
      const data = await response.json();
      setMedia(data);
    }
    fetchMovieDetails();
    async function fetchMovieCredits() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediatype}/${id}/credits?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US`,
      );
      const data = await response.json();
      setCredits(data);
      getWritersAndDirectors(data.crew);
      getStars(data.cast);
    }
    fetchMovieCredits();
  }, [mediatype, id]);

  if (media === null || credits === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="media">
        {!episodesClicked ? (
          <>
            <div>
              {media.hasOwnProperty('first_air_date') ? (
                <div>
                  <h1>{media.name}</h1>
                </div>
              ) : (
                <div>
                  <h1>{media.title}</h1>
                </div>
              )}
              <p>{getReleaseDate(media)}</p>
              <p>{getRuntime(media).toString()}</p>
            </div>
            <div id="media-details">
              <img src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`} alt="media-poster" />
              <p id="overview">{media.overview}</p>
            </div>
            <div id="media-credits">
              {!media.hasOwnProperty('first_air_date') ? (
                <div>
                  <div>
                    <h2>Director(s)</h2>
                    {directors.map((director) => (
                      <p key={director.id}>{director.name}</p>
                    ))}
                  </div>
                  <div>
                    <h2>Writer(s)</h2>
                    {writers.map((writer) => (
                      <p key={writer.id}>{writer.name}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {media.created_by.length === 0 ? null : (
                    <React.Fragment>
                      <h2>Creator</h2>
                      <p>{media.created_by[0].name}</p>
                    </React.Fragment>
                  )}
                </div>
              )}
              <div>
                <h2>Stars</h2>
                {stars.map((star) => (
                  <p key={star.id}>{star.name}</p>
                ))}
              </div>
              <button
                onClick={() => {
                  IsLoggedIn ? addToWatchList('userID or name idk') : window.alert('Please Login first !');
                }}
              >
                Add to Watchlist
              </button>
              {media.hasOwnProperty('first_air_date') ? (
                <div onClick={() => props.setEpisodesClicked(true)}>
                  <h2>Episodes</h2>
                  <p>{media.number_of_episodes}</p>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <Episodes id={id} />
        )}
      </div>
    );
  }
}

export default MediaDetails;
