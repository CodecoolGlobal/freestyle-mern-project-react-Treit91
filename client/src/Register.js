import React from 'react'
import { useState } from 'react'

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const URL = "http://localhost:3001/api/register"
    
    const submitRegistration = async () => {
        if (checkDetails()) {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    username: userName,
                    email: email,
                    password: password
                })
            })
            const data = await res.json()
            if (data === "username taken") {
                window.alert("Username already occupied!");
            } else if (data === "email exists") {
                window.alert("E-Mail already used!");
            } else if (data === "ok") {
                window.alert("Your registration was successful!")
            }
        }
    }

    const checkDetails = () => {
        if (firstName.length < 3) {
            window.alert("First name must be at least 3 characters long!");
            return false;
        }
        if (lastName.length < 3) {
            window.alert("Last name must be at least 3 characters long!");
            return false;
        }
        if (userName.length < 3) {
            window.alert("Username must be at least 3 characters long!");
            return false;
        }
        if (password.length < 3) {
            window.alert("Password must be at least 3 characters long!");
            return false;
        }
        if (password !== confirmPassword) {
            window.alert("Passwords don't match!");
            return false;
        }
        return true;
    }


    return (
        <>
            <div className='register'>
                <form className='registerForm' onSubmit={(e) => { e.preventDefault(); submitRegistration() }}>
                    <div className='registerInputContainer'>
                        <div className='userInput'>
                            <label>First name:
                                <input type='text' onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                        </div>
                        <div className='userInput'>
                            <label>Last name:
                                <input type='text' onChange={(e) => setLastName(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <div className='registerInputContainer'>
                        <div className='userInput'>
                            <label>Username:
                                <input type='text' onChange={(e) => setUserName(e.target.value)} />
                            </label>
                        </div>
                        <div className='userInput'>
                            <label>Email:
                                <input type='email' onChange={(e) => setEmail(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <div className='registerInputContainer'>
                        <div className='userInput'>
                            <label>Password:
                                <input type='password' onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </div>
                        <div className='userInput'>
                            <label>Confirm password:
                                <input type='password' onChange={(e) => setConfirmPassword(e.target.value)} />
                            </label>
                        </div>
                    </div>
                    <button type='submit'>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register