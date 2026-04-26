import React from 'react'
import { useState } from 'react'

export default function Register() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        emailError: "",
        firstNameError: "",
        lastNameError: "",
        userNameError: "",
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
        const regexName = /^[\w]{2,30}$/
        const regexUserName = /^[\w~_\-&#!@]{5,15}$/
        const regexPass = /^[A-Z]{1,2}[\w~_\-&#!@\s+]{7,25}[\W]?$/

        if (name === "email") {
            setErrors(prevErrors => ({
                ...prevErrors,
                emailError: regexEmail.test(newValue) ? "" : "Invalid email format"
            }))
        }
        if (name === "firstName") {
            setErrors(prevErrors => ({
                ...prevErrors,
                firstNameError: regexName.test(newValue) ? "" : "First Name should be between 2 and 30 characters",
            }))
        }
        if (name === "lastName") {
            setErrors(prevErrors => ({
                ...prevErrors,
                lastNameError: regexName.test(newValue) ? "" : "Last Name should be between 2 and 30 characters",
            }))
        }
        if (name === "username") {
            setErrors(prevErrors => ({
                ...prevErrors,
                usernameError: regexUserName.test(newValue) ? "" : "User Name should be between 5 and 15 characters and can include letters, numbers, and special characters ~ _ - & # ! @",
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
        let userData={
            firstName:formData.firstName,
            lastName:formData.lastName,
            email:formData.email,
            username:formData.username,
            password:formData.password
        }
        localStorage.setItem("userDataLogin",JSON.stringify(userData))

        setFormData(prevFormData => ({
            ...prevFormData,
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
        }))
    }

    return (
        <div className='contactContainer'>
            <form onSubmit={handleSubmit} className="formContainer">
                <div className='fullName'>

                    <label htmlFor="fName">Full Name</label>
                    <div className='fullNameContainer'>

                        <div className='fnameHolder'>
                            <input
                                type="text" name="firstName" id="fName"
                                value={formData.firstName} className={formData.firstName === "" ? "" :
                                    errors.firstNameError ? "inputError" : "inputSuccess"} onChange={handleChange} required />
                            {errors.firstNameError && <span className='inpErr'>{errors.firstNameError}</span>}

                            <span className='fnameTitle'>First Name</span>
                        </div>
                        <div className='lnameHolder'>
                            <input
                                type="text" name="lastName" id="lName"
                                value={formData.lastName} className={formData.lastName === "" ? "" :
                                    errors.lastNameError ? "inputError" : "inputSuccess"} onChange={handleChange} required />
                            {errors.lastNameError && <span className='inpErr'>{errors.lastNameError}</span>}
                            <span className='lnameTitle'>Last Name</span>
                        </div>

                    </div>

                </div>

                <label htmlFor="username">User Name</label>
                <input
                    type="text" name="username" id="username"
                    value={formData.username} className={formData.username === "" ? "" :
                        errors.usernameError ? "inputError" : "inputSuccess"} onChange={handleChange} required />
                {errors.usernameError && <span className='inpErr'>{errors.usernameError}</span>}
                <span className='usernameTitle'>User Name</span>

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
                <button className='btnSubmit' >Register</button>

            </form>
        </div>

    )
}
