import React from 'react'
import './App.css';
import LandingPage from './LandingPage';
import { useState } from 'react';



function App() {
    const [search, setSearch] = useState("");
    const [signupstate, setSignupstate] = useState(false)
    const [loginstate, setLoginState] = useState(false)

    return (
        <div className='app'>
            <h1>App name</h1>
            <div className='nav-buttons'>
                <button className='login' onClick={() => { setLoginState(true) }}>Login</button>
                <button className='sign_up' onClick={() => { setSignupstate(true) }}>Sign Up</button>
            </div>
            <div className='search'>
                <input
                    type='text'
                    className='input'
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Search...'
                />
            </div>
            {!signupstate && !loginstate}?(
            <div>
                <LandingPage />
            </div>
            ){signupstate}?(
            <div>
                Soma sign up component
            </div>
            ){loginstate}?(
            <div>
                Soma login component
            </div>
            )


        </div>
    )
}

export default App