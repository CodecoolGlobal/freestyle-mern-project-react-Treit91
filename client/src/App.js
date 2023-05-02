import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';


const api_key = "2f3800bf22a943ae031e99ccee3c5628";
const api_url = `https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}`;

function App() {

  const trendingMovies = async () => {
    const response = await fetch(api_url)
    const data = await response.json()
    console.log(data.results)
    setTrending(data.results)
  };

  useEffect(() => {
    trendingMovies()
  }, []);

  const [trending, setTrending] = useState([]);
  const [movieClicked, setMovieClick] = useState(false)
  const [search,setSearch] = useState("")
  

  return (
    <div className='app'>
      <h1>App name</h1>
      <div className='nav-buttons'>
        <button onClick={() => { }}>Login</button>
        <button on onClick={() => { }}>Sign Up</button>
      </div>
      <div className='search'>
      <input
            type='text'
            className='input'
            onChange={e => setSearch(e.target.value)}
            placeholder='Search...'
          />
      </div>
      <div className='container'>
        <div >
          {trending.map((movies) => {
            return (
              <div className='movies'>
                <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt='movieimg' movieID={movies.id} onClick={() => { setMovieClick(true) }} />
                <h2>{movies.title}</h2>
                <p>Rating: 10/{movies.vote_average.toFixed(1)}</p>
                <p>Release date: {movies.release_date}</p>
                <button movieID={movies.id} onClick={() => { setMovieClick(true) }}>Learn more</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

}

export default App;