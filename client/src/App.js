import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import MediaDetails from './components/MediaDetails';

function App() {
  const [search, setSearch] = useState('');
  const [signupstate, setSignupstate] = useState(false);
  const [loginstate, setLoginState] = useState(false);
  const [movieClicked, setMovieClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [signnedUp, setSignnedUp] = useState(false);
  
  const [dropdownClicked, setDropdownClicked] = useState(false);
  const [dropdownID, setDropdownID] = useState('');
  const [dropdownType, setDropdownType] = useState('');

  function getMovieClicked() {
    setMovieClick(true);
  }

  function setInputValueToDefault() {
    if (document.querySelector('.input').value !== '') {
      document.querySelector('.input').value = '';
    }
    document.querySelector('.dropdown').style.display = 'none';
  }

  async function searchFetch(input) {
    const query = input.split(' ').join('%20');
    const resp = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=2f3800bf22a943ae031e99ccee3c5628&language=en-US&query=${query}&page=1&include_adult=false`,
    );
    const data = await resp.json();
    setSearch(data);
  }



  return (
    <div className="app">
      {signupstate || loginstate  ? null : (
        <div id="MovieDB">
          <div>
            <h1
              id="page_title"
              onClick={() => {
                setMovieClick(false);
                setDropdownClicked(false);
              }}
            >
              MovieDB
            </h1>
          </div>
          <div className="search">
            <input
              type="text"
              className="input"
              onChange={(e) => {
                searchFetch(e.target.value);
              }}
              placeholder="Search..."
            />
            <div className="dropdown">
              <ul>
                {search
                  ? search.results.map((movie) => (
                      <div
                        className="results"
                        key={movie.id}
                        onClick={() => {
                          setInputValueToDefault();
                          setDropdownClicked(true);
                          setDropdownID(movie.id);
                          setDropdownType(movie.media_type);
                        }}
                      >
                        {movie.media_type === 'person' ? null : (
                          <>
                            <li key={movie.id}></li>
                            {movie.poster_path ? (
                              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie"></img>
                            ) : null}
                            {movie.hasOwnProperty('first_air_date') ? <p>{movie.name}</p> : <p>{movie.title}</p>}
                            {movie.hasOwnProperty('first_air_date') ? (
                              <p>{movie.first_air_date.split('-')[0]}</p>
                            ) : (
                              <p>{movie.release_date.split('-')[0]}</p>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div className="nav-buttons">
            <button
              className="login"
              onClick={() => {
                setSearch('');
                setLoginState(true);
                setSignupstate(false);
              }}
            >
              Login
            </button>
            <button
              className="sign_up"
              onClick={() => {
                setSearch('');
                setSignupstate(true);
                setLoginState(false);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {!signupstate && !loginstate && !dropdownClicked ? (
        <div>
          <LandingPage setmovieClicked={getMovieClicked} isMovieClicked={movieClicked} IsLoggedIn ={loggedIn} />
        </div>
      ) :  signupstate && !signnedUp ? (
        <div>
          <Register />
          <button onClick={() => setSignupstate(false)}>Cancel</button>
        </div>
      ) : loginstate ? (
        <div>
          <Login setLoggedIn ={setLoggedIn}  />
          <button onClick={() => setLoginState(false)} >Cancel</button>
        </div>
      ) : dropdownClicked ? (
        <MediaDetails movieID={dropdownID} media_type={dropdownType} />
      ) : null}
    </div>
  );
}

export default App;
