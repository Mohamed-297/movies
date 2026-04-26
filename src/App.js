import Nav from "./components/Nav.jsx"
import {Navigate, Route,Routes} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Contact from "./pages/Contact.jsx"
import Sidebar from "./components/Sidebar.jsx";
import About from "./pages/About.jsx";
import Movies from "./pages/Movies.jsx";
import TvShows from "./pages/TvShows.jsx";
import { createContext, useEffect, useState } from "react";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Protected from "./pages/Protected.jsx";
export const moviesContext =createContext();
function App() {
  const[loader,setLoader]=useState(true);
  const [movies, setMovies] = useState({ data: [] })
  const [filteredMovies, setFilteredMovies] = useState({ data: [] })
  const [isActiveGenre,setIsActiveGenre]=useState("")
  const [userChoice,setUserChoice]=useState("")
  const [error,setError]=useState(null);
  const categories=["Movies","TvShows"];
  const genres=["Action","Comedy","Drama","Thriller","Science-Fiction","Fantasy","Horror"]
  const [toggleSideBar,setToggleSideBar]=useState(true)
  const [screenWidth,setScreenWidth]=useState(window.innerWidth);
  useEffect(()=>{
    function handleResize(){
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener("resize",handleResize)
    return()=>{
      window.removeEventListener("resize",handleResize)
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[window.innerWidth])
  console.log(screenWidth)
  async function getMovies(url="https://Jsonfakery.com/movies/paginated"){
    try{
        setIsActiveGenre("")
        setLoader(true);
        setMovies(null)
        setError(null);
        const res = await fetch(url,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })
        if(!res.ok){
            throw new Error("Failed to fetch data")
        }
        const data = await res.json();
        const updatedData={
            ...data,
            data:data.data.map((movie)=>({
                ...movie,
                genre:genres[Math.floor(Math.random()*genres.length)],
                category:categories[Math.floor(Math.random()*categories.length)]
            }))
        }
        setMovies(updatedData);
        setFilteredMovies(updatedData)

        
        console.log(filteredMovies) 
        console.log(updatedData)            
        console.log(movies)
        
    }
    catch(err){
        setError(err.message);
    }finally{
        setLoader(false);
    }
    }
    useEffect(()=>{
        getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className="App">
      <moviesContext.Provider value={{userChoice,setUserChoice
        ,isActiveGenre,setIsActiveGenre,
        loader,setLoader,error,movies,setMovies,
        filteredMovies,setFilteredMovies,toggleSideBar,setToggleSideBar,
        getMovies,screenWidth}}>
          
      { (screenWidth<=960&&toggleSideBar)&&
          <div className="hamburger" onClick={()=>setToggleSideBar(prevTog=>!prevTog)} >
            <span></span>
            <span></span>
            <span></span>
          </div>
      }
        <Sidebar />
        <div className="navMain">
          <Nav />
          <div className="main">
            <Routes>
              <Route path="/" element={
                <Protected>
                  <Home />
                </Protected>
                } />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TvShows />} />
              <Route path="/*" element={<NotFound/>}/>
            </Routes>
          </div>
        </div>
      </moviesContext.Provider>
    </div>
  );
}

export default App;
