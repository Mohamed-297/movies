
import React, { useContext } from 'react'
import { moviesContext } from '../App'

export default function TvShows() {
  const {loader,movies,filteredMovies}=useContext(moviesContext);
  
  console.log(filteredMovies)
  return (
        <div className={movies?`movieContainer`:`movieContainer noMovies`}>
    {
    movies?         
    filteredMovies?.data.map((movie)=>{
    return(
        <div className='movieCard' key={movie.id}>
            <div className='movieTitleImgContainer'>
                <img className='movieImg'  src={movie.poster_path} alt={movie.original_title} />
                <h3>{movie.original_title}</h3>
            </div>
            <a className='trailerLink' href={`https://www.youtube.com/results?search_query=${movie.original_title}+trailer`} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
        </div>
    )
    }): loader? "": <h2 className='noData'>No movies found</h2>
    }

    </div>
  
  )
}
