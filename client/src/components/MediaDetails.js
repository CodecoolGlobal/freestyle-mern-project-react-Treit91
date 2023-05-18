import React, { useEffect } from 'react';
import Episodes from './Episodes';

function MediaDetails(props) {
  const [media, setMedia] = React.useState(null);
  const [credits, setCredits] = React.useState(null);
  const [directors, setDirectors] = React.useState([]);
  const [writers, setWriters] = React.useState([]);
  const [stars, setStars] = React.useState([]);
  const [runtimeIfNoRuntimeInfo, setRuntimeIfNoRuntimeInfo] = React.useState(null);
  const [popup, setPopup] = React.useState(false);
  const [inWatchlist, setInWatchlist] = React.useState(false);

  const mediatype = props.media_type;
  const id = props.movieID;
  const loggedIn = props.loggedIn;
  const signUp = props.IsSignnedUp;
  const episodesClicked = props.episodesClicked;
  const username = props.username;

  async function fetchWatchlist() {
    try {
      const response = await fetch(`http://localhost:3001/api/watchlist/${username}`);
      const data = await response.json();
      const watchlist = data.watchlist;
      const isInWatchlist = watchlist.some((item) => item.id === String(id)); // this looks if any object has that specific id
      setInWatchlist(isInWatchlist);
    } catch (error) {
      console.log('Error fetching watchlist:', error);
    }
  }

  const handleWatchlist = async () => {
    await fetch(`http://localhost:3001/api/watchlist/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: `${id}`,
        mediatype: `${mediatype}`,
        name: `${media.title}`,
        img: `https://image.tmdb.org/t/p/w500/${media.poster_path}`,
      }),
    });
    await fetchWatchlist();
  };

  const deleteWathlist = () => {
    fetch(`http://localhost:3001/api/watchlist/${username}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => fetchWatchlist());
  };

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
    fetchWatchlist();
  }, []);

  useEffect(() => {
    async function fetchRuntime() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/1?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US`,
      );
      const data = await response.json();
      setRuntimeIfNoRuntimeInfo(data.episodes[0].runtime);
    }
    if (mediatype === 'tv') {
      fetchRuntime();
    }
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
  }, [mediatype, id, inWatchlist, username]);

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
                <React.Fragment>
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
                </React.Fragment>
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
              {
                <button
                  onClick={() => {
                    if (loggedIn && !inWatchlist) {
                      handleWatchlist();
                    } else if (!loggedIn) {
                      setPopup(true);
                      setTimeout(() => {
                        setPopup(false);
                      }, 1500);
                    } else if (loggedIn && inWatchlist) {
                      deleteWathlist();
                    }
                  }}
                >
                  {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
              }
              {media.hasOwnProperty('first_air_date') ? (
                <div onClick={() => props.setEpisodesClicked(true)}>
                  <h2>Episodes</h2>
                  <p>{media.number_of_episodes}</p>
                </div>
              ) : null}
            </div>
            {popup ? (
              <div className="popup-container">
                <div className="popup-body">
                  <h1>Please login first!</h1>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <Episodes id={id} setEpisodesClicked={props.setEpisodesClicked} />
        )}
      </div>
    );
  }
}

export default MediaDetails;
