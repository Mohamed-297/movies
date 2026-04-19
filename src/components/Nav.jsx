import "./nav.css"
import {Link, useLocation} from "react-router-dom"

export default function Nav() {
const navigate=useLocation()
return (
    <header className="App-header">
        <div className="nav">
            <p className='userChoice' >{navigate.pathname==="/"?`Home`:(navigate.pathname.slice(1,)
            .replace(navigate.pathname[1],navigate.pathname[1].toUpperCase())
            .replace(/-\w/g,navigate.pathname[navigate.pathname.indexOf("-")+1].toUpperCase()))}</p>
            <Link className='contactBtn' to="contact" >Contact Us</Link>
        </div>
    </header>
  )
}
