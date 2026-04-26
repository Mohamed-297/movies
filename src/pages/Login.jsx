import React, { useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        emailError: "",
        passError: ""
    })


    function handleChange(e) {
        const { name, value, checked, type } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: newValue,
        }))
        const regexEmail = /^[\w]+\.?[\w]+?@[\w]+\.[\w]{2,3}$/
        const regexPass = /^[A-Z]{1,2}[\w~_\-&#!@\s+]{7,25}[\W]?$/

        if (name === "email") {
            setErrors(prevErrors => ({
                ...prevErrors,
                emailError: regexEmail.test(newValue) ? "" : "Invalid email format"
            }))
        }

        if (name === "password") {
            setErrors(prevErrors => ({
                ...prevErrors,
                passError: regexPass.test(newValue) ? "" : "Password should be between 8 and 25 characters, start with 1 or 2 uppercase letters, and can include letters, numbers, spaces, and special characters ~ _ - & # ! @",
            }))
        }
    }
    function handleSubmit(e) {
        e.preventDefault()
        let userLogged=JSON.parse(localStorage.getItem("userDataLogin"))
        if(!userLogged){
            alert("No user found, please register first")
            return;
        }else if(userLogged.email===formData.email&&userLogged.password===formData.password){
            localStorage.setItem("isLoggedIn","true")
            alert("Login successful")
            navigate("/home")
        }else{
            alert("Invalid email or password")
        }
    }
    return (
        <div className='contactContainer'>
            <form onSubmit={handleSubmit} className="formContainer">

                <label htmlFor="email">Email</label>
                <input
                    type="text" name="email" id="email"
                    value={formData.email} className={formData.email === "" ? "" :
                        errors.emailError ? "inputError" : "inputSuccess"} onChange={handleChange} required />
                {errors.emailError && <span className='inpErr'>{errors.emailError}</span>}
                <span className='emailTitle'>example@example.com</span>

                <label htmlFor="password">password</label>
                <input
                    type="password" name="password" id="password"
                    value={formData.password} className={formData.password === "" ? "" :
                        errors.passError ? "inputError" : "inputSuccess"} onChange={handleChange} required />
                {errors.passError && <span className='inpErr'>{errors.passError}</span>}
                <span className='emailTitle'>Password</span>
            
                        <div className='btnSubmitContainer'>
                    <button className='btnSubmitLogin' >Login</button>
                    <Link className='notRegistered' to="/register" >Don't have account yet Register</Link>
                </div>
            </form>
        </div>

    )
}
