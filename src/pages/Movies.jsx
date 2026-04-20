import React, { useContext } from 'react'
import { moviesContext } from '../App'
export default function Movies() {
const {loader,movies,filteredMovies,getMovies}=useContext(moviesContext);

console.log(filteredMovies)
return (
     <div>
    {loader&& <h2 className='loadingData'>Loading...</h2>}
    {/* {error&&<h2 className='loadingError'>{error}</h2>} */}
    <div className='movieHeading'>
        <p>Movies</p>
    </div>
    <div className={movies?`movieContainer`:`movieContainer noMovies`}>
    {
    movies?         
    (filteredMovies?.data||movies?.data).map((movie)=>{
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
    {
    movies&&(
        <div className='pagination'>
            <button
                className={movies.prev_page_url===null?"disabled":"activePrev"}
                disabled={!movies.prev_page_url}
                onClick={()=>getMovies(movies.prev_page_url)}
            >prev
            </button> 
            {
                movies.links.filter((link)=>
                    // remove the next and previous buttons from the pagination links 
                    link.label!=="&laquo; Previous" && 
                    link.label!=="Next &raquo;"
                ).map((link,index)=>{
                    return(
                        <button
                            key={index}
                            disabled={!link.url}
                            className={link.active?"active":""}
                            onClick={()=>getMovies(link.url)}
                            dangerouslySetInnerHTML={{ __html:link.label}}
                        />
                    )
                })
            }
            <button
                className={movies.next_page_url===null?"disabled":"activeNext"}
                disabled={!movies.next_page_url}
                onClick={()=>getMovies(movies.next_page_url)}
            >next
            </button> 
        </div>
    )
    }
    </div>
)
}
