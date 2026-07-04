import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Styles/edit.css"
import { toast } from "react-toastify";

const Edit = () => {
  console.log(useParams());
  let { userid } = useParams();
  console.log(userid);

  let navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [city, setCity] = useState("");
  let [street, setStreet] = useState("");
  let [zipcode, setZipcode] = useState("");
  let [company, setCompany] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/data/${userid}`)
    .then( (res) => {
      console.log(res);
      setUsername(res.data.username )
      setName(res.data.name)
      setEmail(res.data.email)
      setPhone(res.data.phone)
      setCity(res.data.address.city)
      setStreet(res.data.address.street)
      setZipcode(res.data.address.zipcode)
      setCompany(res.data.address.company)      
    }).catch((err) => {
      console.error("Error fetching data: ", err)
    })
  }, [] )

  let updateData = (e) => {
    e.preventDefault();
    let payroll = {
      username,
      name,
      email,
      phone,
      address : {
        city,
        street, 
        zipcode,
        company
      }
    } 
    console.log(payroll);
    axios.put(`http://localhost:8080/data/${userid}`, payroll)
    .then( () => {
      console.log("Data updated successfully");
      navigate("/")      
      toast.success("Data Updated Successfully", 3000)
    })
  }

  return <>
    <Form>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Username</Form.Label>
        <Form.Control className="input" type="text" value={username} onChange={(e) => { 
          setUsername(e.target.value)
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Name</Form.Label>
        <Form.Control className="input" type="text" value={name} onChange={(e) => {
          setName(e.target.value)
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className="input" type="email" value={email}  onChange={(e) => {
          setEmail(e.target.value)
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTel">
        <Form.Label>Phone</Form.Label>
        <Form.Control className="input" type="tel" value={phone} onChange={(e) => {
          setPhone(e.target.value)
        }}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>City</Form.Label>
        <Form.Control className="input" type="text" value={city} onChange={(e) => {
          setCity(e.target.value)
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Street</Form.Label>
        <Form.Control className="input" type="text" value={street} onChange={(e) => {
          setStreet(e.target.value)
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Zipcode</Form.Label>
        <Form.Control className="input" type="number" value={zipcode}  onChange={(e) => {
          setZipcode(e.target.value)
        }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Company</Form.Label>
        <Form.Control className="input" type="text" value={company}  onChange={(e) => {
          setCompany(e.target.value)
        }} />
      </Form.Group>
      

      <div className="btn">
        <Button variant="primary" type="submit" onClick={updateData}>
          Update
        </Button>

        <Button variant="secondary" onClick={() => {
          navigate("/")
        }} >
          Cancel
        </Button>
      </div>

      

    </Form>
  </>;
};

export default Edit;
