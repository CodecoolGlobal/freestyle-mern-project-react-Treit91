import React, { useEffect } from 'react';

function Episodes(props) {
  const [show, setShow] = React.useState(null);
  const [seasons, setSeasons] = React.useState(null);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = React.useState(1);
  const [selectedSeason, setSelectedSeason] = React.useState(null);

  const id = props.id;

  function getSeasons(show) {
    const seasons = [];
    for (let i = 1; i <= show.number_of_seasons; i++) {
      seasons.push(i);
    }
    setSeasons(seasons);
  }


  function getAiringDate(media) {
    if (media.hasOwnProperty('first_air_date')) {
      if (media.hasOwnProperty('last_air_date')) {
        return `${media.first_air_date.split('-')[0]} - ${media.last_air_date.split('-')[0]}`;
      } else {
        return `${media.first_air_date.split('-')[0]} -`;
      }
    }
  }

  useEffect(() => {
    async function fetchShowDetails() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US`,
      );
      const data = await response.json();
      setShow(data);
      getSeasons(data);
    }
    fetchShowDetails();
    async function fetchSelectedSeason() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeasonNumber}?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US`,
      );
      const data = await response.json();
      setSelectedSeason(data);
    }
    fetchSelectedSeason();
  }, [selectedSeasonNumber, id]);

  if (!show) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="episodes" key={show.id}>
        <div className="showDetails">
          <h1 className="showTitle" onClick={() => props.setEpisodesClicked(false)}>{show.name}</h1>
          <p>{getAiringDate(show)}</p>
        </div>
        <select onChange={e => setSelectedSeasonNumber(e.target.value)}>
          {seasons.map((season) => (
            <option value={season} key={season}>
              {season}
            </option>
          ))}
        </select>
        <div className="episodeList">
          {selectedSeason === null ? (
            <div>Loading...</div>
          ) : (
            selectedSeason.episodes.map((episode) => (
              <div className="episode" key={episode.id}>
                <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt="episode-poster" />
                <h2>{episode.name}</h2>
                <p>Ep. {episode.episode_number}</p>
                <p>{episode.overview}</p>
                <p>{episode.air_date}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Episodes;
