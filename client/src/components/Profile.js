import React, { useEffect } from 'react';
import { useState } from 'react';

function Profile(props) {
  const loggedInUser = props.profile;

  const [changeUserName, setChangeUserName] = useState(loggedInUser.username);
  const [changePassword, setChangePassword] = useState('');
  const [changeConfirmPassword, setChangeConfirmPassword] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const URL = `http://localhost:3000/user/${loggedInUser.username}`;

  const submit = () => {
    if (changeUserName.length >= 3 && changePassword.length >= 3 && setChangeConfirmPassword.length >= 3) {
      if (changePassword === changeConfirmPassword) {
        fetch(URL, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: changeUserName,
            password: changePassword,
          }),
        });
        window.alert('Your profile has updated!');
      } else {
        window.alert("Password don't match!");
      }
    } else {
      window.alert('Username and password have to be atleast 3 character long!');
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/profile', {
      headers: {
        Authorization: `Bearer ${props.jwt}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data.user.user);
        console.log(data);
      })
  }, [props.jwt]);

  if (!userDetails) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="profileContainer">
          <div className="profile">
            <p>Change details!</p>
            <div className="changeDetails">
              <label>
                Username:
                <input
                  type="text"
                  defaultValue={userDetails.username}
                  onChange={(e) => {
                    setChangeUserName(e.target.value);
                  }}
                />
              </label>
              <label>
                Change password:
                <input type="password" onChange={(e) => setChangePassword(e.target.value)} />
              </label>
              <label>
                Confirm new password:
                <input type="password" onChange={(e) => setChangeConfirmPassword(e.target.value)} />
              </label>
              <button onClick={submit}>Submit your changes</button>
            </div>
            <p>Your profile</p>
            <div className="userDetails">
              <p className="userDetails">First name: {userDetails.name.first}</p>
              <p className="userDetails">Last name: {userDetails.name.last}</p>
              <p className="userDetails">Email: {userDetails.email}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
