import React from 'react'
import { useState } from 'react';

export let getUser = () => {};
export let setUser = null;
export let refreshUser = null;


function LoggedUser() {

    const [loggedInUser, setLoggedInUser] = useState(null);

    getUser = () => {
        console.log("LoggedUser")
        return loggedInUser;
    }

    setUser = setLoggedInUser;

    const URL = "http://localhost:3001/api/login"

    refreshUser = async (username, password) => {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const data = await res.json();
        setLoggedInUser(data.user);
    }

  return (
    <div>Logged</div>
  )
}

export default LoggedUser 