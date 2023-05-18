import React, { useEffect } from 'react';
import { useState } from 'react';
import MediaDetails from './MediaDetails';

function Profile(props) {
  const loggedInUser = props.profile;

  const [changeUserName, setChangeUserName] = useState(loggedInUser.username);
  const [changePassword, setChangePassword] = useState('');
  const [changeConfirmPassword, setChangeConfirmPassword] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [watchlist, setInWatchlist] = useState([]);
  const [remove, setRemove] = useState(false);
  const [movieID, setMovieID] = useState('');
  const [mediatype, setMediaType] = useState('');

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
    async function fetchWatchlist() {
      try {
        const response = await fetch(`http://localhost:3001/api/watchlist/${userDetails.username}`);
        const data = await response.json();
        console.log(userDetails)
        setInWatchlist(data.watchlist);
      } catch (err) {
        console.log(err);
      }
    }

    fetchWatchlist();
  }, [userDetails]);

  useEffect(() => {
    fetch('http://localhost:3001/api/profile', {
      headers: {
        Authorization: `Bearer ${props.jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data.user.user);
      });
  }, [props.jwt]);

  if (!userDetails) {
    return <div>Loading...</div>;
  } else if (remove) {
    return (
      <MediaDetails movieID={movieID} media_type={mediatype} username={userDetails.username} loggedIn={true} />
    );
  } else if (userDetails) {
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
            <div className="userDetailsDiv">
              <p>Your profile</p>
              <p className="userDetails">First name: {userDetails.name.first}</p>
              <p className="userDetails">Last name: {userDetails.name.last}</p>
              <p className="userDetails">Email: {userDetails.email}</p>
            </div>
          </div>

          {watchlist.length > 0 ? (
            <div id="trendingContainer2">
              <h1 id="trending">Your Watchlist:</h1>
              <div className="container">
                {watchlist.map((movie) => {
                  return (
                    <div
                      className="movies"
                      key={movie.id}
                      onClick={() => {
                        setRemove(true);
                        setMovieID(movie.id);
                        setMediaType(movie.mediatype);
                      }}
                    >
                      <img src={`https://image.tmdb.org/t/p/w500/${movie.img}`} alt="movieimg" />
                      <h2>{movie.name}</h2>
                      <h2>{movie.title}</h2>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>No movie added to your watchlist</p>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
