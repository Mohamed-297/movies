import React from 'react'
import { Navigate } from 'react-router-dom';

export default function Protected({children}) {
    let loggedIn= localStorage.getItem("isLoggedIn");
    if(loggedIn!=="true"){

        return <Navigate to="/login" replace/>
    }
    return children;
}
