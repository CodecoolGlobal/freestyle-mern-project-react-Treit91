import React from 'react';
import { useState } from 'react';

export let getUser;
export let setUser;
export let refreshUser;

function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginPopup, setLoginPopup] = useState(false);
  const [invalidPopup, setInvalidPopup] = useState(false);
  const loggedInUser = props.loggedInUser;
  const setLoggedInUser = props.setLoggedInUser;
  let setLoggedIn= props.setLoggedIn;

  const URL = 'http://localhost:3001/api/login';
  const submitLogin = async () => {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });
    const data = await res.json();
    if (data.success === true) {
      setLoginPopup(true);
      setUserName(data.user);
      setLoggedIn(true);
      setLoggedInUser(data.data.username);
      setTimeout(() => {
        props.setLoginState(false);
        setLoginPopup(false);
      }, 1500);
      props.setJwt(data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    } else if (data.success !== true) {
      setInvalidPopup(true);
      setTimeout(() => {
        setInvalidPopup(false);
      }, 1000);
    }
  };

  getUser = () => {
    setTimeout(() => {
      return loggedInUser;
    }, 100);
  };

  return (
    <div className="loginContainer">
      <form
        className="loginForm"
        onSubmit={(e) => {
          e.preventDefault();
          submitLogin();
        }}
      >
        <div className="loginTitle">
          <p>Please sign in!</p>
        </div>
        <div className="userInput">
          <label>Username:</label>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="userInput">
          <label>Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="loginButtons">
          <button type="submit">Sign in!</button>
          <button onClick={() => props.setLoginState(false)}>Cancel</button>
        </div>
      </form>
      {loginPopup ? (
        <div className="popup-container">
          <div className="popup-body">
            <h1>Succesfully logged in</h1>
          </div>
        </div>
      ) : null}
      {invalidPopup ? (
        <div className="popup-container">
          <div className="popup-body">
            <h1>Invalid username or password</h1>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
