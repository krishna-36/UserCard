import React, { useState } from 'react'
import axios from 'axios'
import '../Styles/create.css'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"

const Create = () => {

  let [username, setUsername] = useState('');
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  let [city, setCity] = useState('')
  let [street, setStreet] = useState('')
  let [zipcode, setZipcode] = useState('')
  let [company, setCompany] = useState('')
  
  let navigate = useNavigate();

  let handleChange = (e) => {
    e.preventDefault();
    let payload = {
      username, 
      name,
      email,
      phone,
      address : {
        city,
        zipcode,
        company,
        street
      }
    }
    console.log(payload);
    axios.post(`${import.meta.env.VITE_API_URL}`, payload)
    .then(() => {
      console.log("data submitted successfully");
      navigate("/")
      toast.success("Data Created Successfully", 3000)
    }).catch((e) => {
      console.log(e);
    })
    
  }


  return (
    <div>
      <form action="" className='form'>
        <input type="text" name="username" id='username' placeholder='Username' onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <input type="text" name="name" id="name" placeholder='Name' onChange={(e) => {
          setName(e.target.value)
        }} />
        <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => {
          setEmail(e.target.value)
        }}/>
        <input type="tel" name="phone" id="phone" placeholder='Phone' onChange={(e) => {
          setPhone(e.target.value)
        }} />
        <input type="text" name="city" id="city" placeholder='City' onChange={(e) => {
          setCity(e.target.value)
        }} />
        <input type="text" name="street" id="street" placeholder='Street' onChange={(e) => {
          setStreet(e.target.value)
        }} />
        <input type="number" name="zipcode" id="zipcode" placeholder='Zipcode' onChange={(e) => {
          setZipcode(e.target.value)
        }} />
        <input type="text" name="company" id="company" placeholder='Company Name' onChange={(e) => {
          setCompany(e.target.value)
        }} />
        <div className='buttons'>
          <button onClick={handleChange}>Submit</button>
          <button onClick={() => { navigate("/") }}>Cancel</button>
        </div>
        
      </form>
    </div>
  )
}

export default Create