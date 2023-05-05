import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { useState, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import MediaDetails from './components/MediaDetails';
import Profile from './components/Profile';

function App() {
  const [search, setSearch] = useState('');
  const [signupstate, setSignupstate] = useState(false);
  const [loginstate, setLoginState] = useState(false);
  const [movieClicked, setMovieClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [signnedUp, setSignnedUp] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dropdownClicked, setDropdownClicked] = useState(false);
  const [dropdownID, setDropdownID] = useState('');
  const [dropdownType, setDropdownType] = useState('');
  const [episodesClicked, setEpisodesClicked] = useState(false);
  const [profile, setProfile] = useState(false);
  const [jwt, setJwt] = useState(null);

  function getMovieClicked() {
    setMovieClick(true);
  }

  useEffect(() => {
    const signedInUser = localStorage.getItem('user');
    console.log(JSON.parse(signedInUser));
    if (signedInUser) {
      const foundUser = JSON.parse(signedInUser);
      setLoggedInUser(foundUser.username);
      setJwt(foundUser.token);
      setLoggedIn(true);
    };
  }, []);

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
      {signupstate || loginstate ? null : (
        <div id="MovieDB">
          <div>
            <h1
              id="page_title"
              onClick={() => {
                setMovieClick(false);
                setDropdownClicked(false);
                setEpisodesClicked(false);
                setProfile(false);
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
                document.querySelector('.dropdown').style.display = 'block';
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
                          setEpisodesClicked(false);
                          setDropdownClicked(true);
                          setDropdownID(movie.id);
                          setDropdownType(movie.media_type);
                        }}
                      >
                        {movie.media_type === 'person' ? null : (
                          <React.Fragment>
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
                          </React.Fragment>
                        )}
                      </div>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div className="nav-buttons">
            {loggedIn ? (
              <React.Fragment>
                <button
                  className="profile"
                  onClick={() => {
                    setProfile(true);
                  }}
                >
                  Profile
                </button>
                <button
                  className="sign_out"
                  onClick={() => {
                    setLoggedInUser(null);
                    setLoggedIn(false);
                    setProfile(false);
                    localStorage.clear();
                  }}
                >
                  Sign Out
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </div>
        </div>
      )}

      {!signupstate && !loginstate && !dropdownClicked && !profile ? (
        <div>
          <LandingPage
            setmovieClicked={getMovieClicked}
            isMovieClicked={movieClicked}
            IsLoggedIn={loggedIn}
            episodesClicked={episodesClicked}
            setEpisodesClicked={setEpisodesClicked}
            setSearch={setSearch}
          />
        </div>
      ) : signupstate && !signnedUp ? (
        <div>
          <Register />
          <button onClick={() => setSignupstate(false)}>Cancel</button>
        </div>
      ) : loginstate ? (
        <div>
          <Login
            setLoggedIn={setLoggedIn}
            setLoginState={setLoginState}
            setLoggedInUser={setLoggedInUser}
            loggedInUser={loggedInUser}
            setJwt={setJwt}
          />
          <button onClick={() => setLoginState(false)}>Cancel</button>
        </div>
      ) : dropdownClicked ? (
        <MediaDetails
          movieID={dropdownID}
          media_type={dropdownType}
          episodesClicked={episodesClicked}
          setEpisodesClicked={setEpisodesClicked}
        />
      ) : profile ? (
        <Profile profile={loggedInUser} jwt={jwt} />
      ) : null}
    </div>
  );
}

export default App;
