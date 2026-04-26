import "./nav.css"
import {Link, useLocation, useNavigate} from "react-router-dom"

export default function Nav() {
const navigate=useLocation()
const nav=useNavigate()
let isLogged=localStorage.getItem("isLoggedIn");
function handleLogout(){
    localStorage.removeItem("isLoggedIn")
    alert("Logout successful")
    nav("/login")
}
return (
    <header className="App-header">
        <div className="nav">
            <p className='userChoice' >{navigate.pathname==="/"?`Home`:(navigate.pathname.slice(1,)
            .replace(navigate.pathname[1],navigate.pathname[1].toUpperCase())
            .replace(/-\w/g,navigate.pathname[navigate.pathname.indexOf("-")+1].toUpperCase()))}</p>
            <div className="navBtns">
                <Link className='contactBtn' to="contact" >Contact Us</Link>
                {isLogged?<button className="logoutBtn" onClick={handleLogout}>Logout</button>:<Link className='loginBtn' to="login" >Login</Link>}
                <Link className='registerBtn' to="register" >Register</Link>
            </div>
        </div>
    </header>
  )
}
