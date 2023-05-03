import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';



const api_key = "2f3800bf22a943ae031e99ccee3c5628";
const api_url = `https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}`;

function LandingPage() {

  const trendingMovies = async () => {
    const response = await fetch(api_url)
    const data = await response.json()
    console.log(data.results)
    setTrending(data.results)
  };

  useEffect(() => {
    trendingMovies()
  }, []);

  const [trending,setTrending] = useState([])
  const [mediatype, setMediaType] = useState("");
  const [ movie_id, setMovie_ID] = useState("")
  const [movieClicked, setMovieClick] = useState(false)

  

  return (
    !movieClicked ? (
<div>
  <h1>Trending Now :</h1>
  <div className='container'>
  {trending.map((movie) => {
    return (
   <div className='movies' key={movie.id}   onClick={() => { setMovieClick(true); setMovie_ID(movie.id);setMediaType(movie.media_type) }}>
    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='movieimg'  />
    <h2>{movie.name}</h2>
    <h2>{movie.title}</h2>
    <p>Rating: 10/{movie.vote_average.toFixed(1)}</p>
    <p>Release date: {movie.release_date}{movie.first_air_date}</p>
    </div>
    );
    })}
  </div>
  </div>) : 
  <div>
    Balazs component  
  </div>
)}
//" <Balazs movieID ={movie_id} media_type = {mediatype}"/>

export default LandingPage;