import React from 'react';
import { useState } from 'react';

export let getUser;
export let setUser;
export let refreshUser;

function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
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
      window.alert('User succesfully logged in !');
      setUserName(data.user);
      setLoggedIn(true);
      setLoggedInUser(data.data.username);
      props.setLoginState(false);
      props.setJwt(data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    } else if (data.success !== true) {
      window.alert('Invalid Username or Password');
    }
  };

  getUser = () => {
    setTimeout(() => {
      return loggedInUser;
    }, 100);
  };

  return (
    <>
      <div className="login">
        <p>Please sign in!</p>
        <form
          className="loginForm"
          onSubmit={(e) => {
            e.preventDefault();
            submitLogin();
          }}
        >
          <div className="userInput">
            <label>
              Username:
              <input type="text" onChange={(e) => setUserName(e.target.value)} />
            </label>
          </div>
          <div className="userInput">
            <label>
              Password:
              <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <button type="submit">Sign in!</button>
        </form>
      </div>
    </>
  );
}

export default Login;
