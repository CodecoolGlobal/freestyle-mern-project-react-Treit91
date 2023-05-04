import React from 'react'
import { useState } from 'react'

function Login(props) {
  let IsLoggedIn = props.setLoggedIn;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const URL = "http://localhost:3001/api/login"
  const submitLogin = async () => {
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
        window.alert("User succesfully logged in !")
        setUserName(data.user);
        IsLoggedIn(true)
      } else if (data.succes !== true){
        window.alert("Invalid Username or Password");
      }  
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
          <button type='submit'  >Sign in!</button>
        </form>
      </div>
    </>
  )
}

export default Login