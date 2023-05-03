import React from 'react'
import { useState } from 'react'

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const URL = "http://localhost:3001/api/login"
  const submitLogin = async () => {
    if (checkInputs()) {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userName,
          password: password
        })
      });
      const data = await res.json();
      if (data.succes === true) {
        setUserName(data.user);
      } else window.alert(data);
    }
  }

  const checkInputs = () => {
    if (userName.length < 3) {
      window.alert("Username must be 3 character long!");
      return false;
    }
    if (password.length < 3) {
      window.alert("Password must be 3 character long!");
      return false;
    }
    return true;
  }

  return (
    <>
      <div className='login'>
        <p>Please sign in!</p>
        <form className='loginForm' onSubmit={(e) => { e.preventDefault(); submitLogin(); }}>
          <div className='userInput'>
            <label>Username:
              <input type='text' onChange={(e) => setUserName(e.target.value)} />
            </label>
          </div>
          <div className='userInput'>
            <label>Password:
              <input type='password' onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <button type='submit'>Sign in!</button>
        </form>
      </div>
    </>
  )
}

export default Login