import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { useState } from 'react';
import Register from './Register';
import Login from './Login';

function App() {
  const [search, setSearch] = useState('');
  const [signupstate, setSignupstate] = useState(false);
  const [loginstate, setLoginState] = useState(false);
  const [movieClicked, setMovieClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [signnedUp, setSignnedUp] = useState(false);
  

  function getMovieClicked() {
    setMovieClick(true);
  }



  return (
    <div className="app">
      <div id="MovieDB">
        <h1 onClick={() => setMovieClick(false)}>
          Movie Database
        </h1>
      </div>
      {signupstate || loginstate  ? null : (
        <div>
          <div className="nav-buttons">
            <button
              className="login"
              onClick={() => {
                setLoginState(true);
                setSignupstate(false);
              }}
            >
              Login
            </button>
            <button
              className="sign_up"
              onClick={() => {
                setSignupstate(true);
                setLoginState(false);
              }}
            >
              Sign Up
            </button>
          </div>
          <div className="search">
            <input type="text" className="input" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
          </div>
        </div>
      )}

      {!signupstate && !loginstate ? (
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
      ) : null}
    </div>
  );
}

export default App;
