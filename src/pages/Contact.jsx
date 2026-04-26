import React from 'react'
import { useState } from 'react'
import "./contact.css"
export default function Contact() {
const [formData,setFormData]=useState({  
  firstName:"",
  lastName:"",
  email:"",
  message:""
})
const [errors,setErrors]=useState({
  emailError:"",
  firstNameError:"",
  lastNameError:""
})


function handleChange(e){
  const{name,value,checked,type}=e.target;
  const newValue=type==="checkbox"?checked:value;
  setFormData(prevFormData=>({
    ...prevFormData,
    [name]:newValue
  }))
const regexEmail=/^[\w]+\.?[\w]+?@[\w]+\.[\w]{2,3}$/
const regexName=/^[\w]{2,30}$/
  if(name==="email"){
      setErrors(prevErrors=>({
        ...prevErrors,
        emailError:regexEmail.test(newValue)?"":"Invalid email format"
      }))  
    }
  if(name==="firstName"){
      setErrors(prevErrors=>({
        ...prevErrors,
        firstNameError:regexName.test(newValue)?"":"First Name should be between 2 and 30 characters",        
      }))  
    }
  if(name==="lastName"){
      setErrors(prevErrors=>({
        ...prevErrors,
        lastNameError:regexName.test(newValue)?"":"Last Name should be between 2 and 30 characters",
      }))  
    }


  
}
function handleSubmit(e){
    e.preventDefault()
    setFormData(prevFormData=>({
        ...prevFormData,
      firstName:"",
      lastName:"",
      email:"",
      message:""
    }))
}
      
  return (
    <div className='contactContainer'>
      <form  onSubmit={handleSubmit} className="formContainer">
        <div className='fullName'>
          
          <label htmlFor="fName">Full Name</label>
          <div className='fullNameContainer'>

            <div className='fnameHolder'>
              <input 
                type="text" name="firstName" id="fName" 
                value={formData.firstName} className={formData.firstName===""?"":
                errors.firstNameError?"inputError":"inputSuccess"} onChange={handleChange} required/>
                {errors.firstNameError&&<span className='inpErr'>{errors.firstNameError}</span>}

              <span className='fnameTitle'>First Name</span>
            </div>
            <div className='lnameHolder'>
              <input 
              
              type="text" name="lastName" id="lName" 
                value={formData.lastName} className={formData.lastName===""?"":
                  errors.lastNameError?"inputError":"inputSuccess"} onChange={handleChange} required/>
                  {errors.lastNameError&&<span className='inpErr'>{errors.lastNameError}</span>}
              <span className='lnameTitle'>Last Name</span>
            </div>
          
          </div>

        </div>
        <label htmlFor="email">Email</label>
        <input 
          type="text" name="email" id="email" 
          value={formData.email} className={formData.email===""?"":
          errors.emailError?"inputError":"inputSuccess"} onChange={handleChange} required/>
          {errors.emailError&&<span className='inpErr'>{errors.emailError}</span>}
        <span className='emailTitle'>example@example.com</span>
        <label htmlFor="message">Message</label>
        
        <textarea 
          type="text" name="message" id="message" 
          value={formData.message} onChange={handleChange} required/>
        <button className='btnSubmit' >Submit</button>        
      </form>  
    </div>
  )
}
