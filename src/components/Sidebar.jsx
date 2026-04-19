import React, { useContext, useEffect, useState } from 'react'
import "./sidebar.css"
import sidebarLogo from "../assets/images/Group 1.png"
import searchLogo from "../assets/images/Vector.png"
import img1 from "../assets/images/Vector (1).png"
import img2 from "../assets/images/Group.png"
import img3 from "../assets/images/Group (1).png"
import img4 from "../assets/images/Group (2).png"
import { data, Link, useLocation, useNavigate } from 'react-router-dom'
import { moviesContext } from '../App'
export default function Sidebar() {
  const [searchValue,setSearchValue]=useState("")
  const [isActive,setIsActive]=useState("")
  const {toggleSideBar,setToggleSideBar,userChoice,setUserChoice,isActiveGenre,setIsActiveGenre,loader,movies,filteredMovies,setFilteredMovies}=useContext(moviesContext);  
  const nav=useLocation()
  // search character by character about the movie name
  function handleSearch(e){  
    setSearchValue(e.target.value)
    const filtered= movies.data.filter((filteredMovie)=> filteredMovie.original_title.toLowerCase().includes(e.target.value))
    setFilteredMovies({...movies,data:filtered})
  }
  
  // using this useEffect for applying the effect of clicking on the list when reload the page 
  useEffect(()=>{
    if(nav.pathname==="/home"||nav.pathname==="/"){
      setIsActive("Home")
    }
    if(nav.pathname==="/about-us"){
      setIsActive("About Us")
    }
    if(nav.pathname==="/movies"){
      setIsActive("Movies")
    }
    if(nav.pathname==="/tv-shows"){
      setIsActive("TV Shows")
    }
},[nav.pathname])
  // 
  function handleListShow(list){
    setIsActive(list)
    setIsActiveGenre("")
    setUserChoice("")
    // used to get the whole movies filtered cause of genre filtering
    if(list==="Home"){
      setFilteredMovies({...movies})
      // setIsActive("home")
    }
    
  }
  useEffect(()=>{
    if(!movies)return;
    if(nav.pathname==="/movies"){
      const catMovies=movies.data.filter((catMovie)=>catMovie.category.includes("Movies"))
      setFilteredMovies({...movies,data:catMovies})
    }
    if(nav.pathname==="/tv-shows"){
      const catTv=movies.data.filter((catTv)=>catTv.category.includes("TvShows"))
      setFilteredMovies({...movies,data:catTv})
    }
  
  },[nav.pathname,movies])
  // filtering by clicking the genre
  function handleGenreSearch(gen){
    if(!movies||loader)return;

    let catFilter=movies.data;
    if(nav.pathname==="/movies"){
        catFilter=catFilter.filter((catMovie)=>catMovie.category.includes("Movies"))
    }
    if(nav.pathname==="/tv-shows"){
        catFilter=catFilter.filter((catMovie)=>catMovie.category.includes("TvShows"))
    }

    catFilter=catFilter.filter((genreMovie)=>genreMovie.genre.toLowerCase().includes(gen.toLowerCase()))
    setFilteredMovies({...movies,data:catFilter})
    

      if(nav.pathname!=="/about-us"){
        setIsActiveGenre(gen)
        setUserChoice(gen)
      }    
    }

  
  
console.log(userChoice)

  
  // arrays of all data needed
  let arrOfLists=["Home","About Us","Movies","TV Shows"]
  let arrOfImgs=[img1,img2,img3,img4]
  let arrOfGenres=["Action","Comedy","Drama","Thriller","Science-Fiction","Fantasy","Horror"]
   
return (
      
      
    <div  className={toggleSideBar?`sidebar`:`hideSideBar`}>
      <p onClick={()=>setToggleSideBar(prevTog=>!prevTog)} className='exit'>X</p>
      <div className="sidebarTitle">
        <img className='sidebarLogo' src={sidebarLogo} alt="sidebarLogo" />
        <h2 className='sidebarTitleText'>Daily<span>Hub</span></h2>
      </div>
      <div className='searchBar'>
        <img className='searchLogo' src={searchLogo} alt="searchLogo" />
        <input className='searchInp' type='text' 
              placeholder='Search' name='search' 
              onChange={handleSearch} 
              value={searchValue} /> 
      </div>
      {/* lists of routing between pages */}
      <ul className='sidebarLists'>
        {arrOfLists.map((list,index)=>{
          return (<li  onClick={()=>handleListShow(list)} className={isActive===list?"activeSidebarListItem":'sidebarListItem'} key={list} >
              <Link to={`${list.toLowerCase().replace(/\s+/g, '-')}`}>
                {<img src={arrOfImgs[index]} alt='img'/>}<span>{list}</span>
              </Link>
            </li>)})}
      </ul>
      <div className="genres">
        <h3 className='genresTitle'>Genres</h3>
      </div>
      {/* genres of movies */}
      <ul className='sidebarGenres'>
            {
              arrOfGenres.map((genre)=>{
                return (<li onClick={()=>handleGenreSearch(genre)} 
                        className={nav.pathname!=="/about-us"&&isActiveGenre===genre?
                        "activeGenreList":"genreList"} key={genre}>{genre}</li>)
              })
            }
      </ul>
      <div className='copyRights'>
        <p>&copy; 2024 <span>Daily Hub</span> All Rights Reserved</p>
      </div>
    </div>
  )
}
