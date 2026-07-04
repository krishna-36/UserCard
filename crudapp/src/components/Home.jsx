import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import "../Styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const Home = () => {
  let [state, setState] = useState([]);
  let navigate = useNavigate();

  // fetch data
  let fetchData = async () => {
    let res = await axios.get("http://localhost:8080/data");
    console.log(res);
    let { data } = res;
    setState(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let handleDelete = (id) => {
    console.log("delete");
    if(window.confirm("Confirm Delete"))    
    {
      axios.delete(`http://localhost:8080/data/${id}`)
      .then(
        navigation.reload()
      )
      .catch(
        (error) => {
          console.log(error);
        }
      )
    }
  }

  return (
    <>
      <h2>
        <Button id="add-user" onClick={() => { navigate("/create") }}>Add User</Button>
      </h2>
      <div className="wrapper">
        {state.map((value) => {
          console.log(value);
          return (
            <Card style={{ width: "18rem" }} key={value.id}>
              <Card.Img
                variant="top"
                src={`https://api.dicebear.com/10.x/lorelei/svg?seed=${value.username}`}
              />
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Username : {value.username}</ListGroup.Item>
                <ListGroup.Item>Email : {value.email}</ListGroup.Item>
                <ListGroup.Item>Phone : {value.phone}</ListGroup.Item>
                <ListGroup.Item>
                  Company : {value.address.company}
                </ListGroup.Item>
                <ListGroup.Item>Street : {value.address.street}</ListGroup.Item>
                <ListGroup.Item>city : {value.address.city}</ListGroup.Item>
                <ListGroup.Item>
                  zipcode : {value.address.zipcode}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body className="icon-body">
                <div className="icons">
                  <span onClick={() => { navigate(`/edit/${value.id}`) }}>
                    <CiEdit size={22} />
                  </span>
                  <span onClick={() => {
                    handleDelete(value.id)
                  }}>
                    <MdDelete size={22} />
                  </span>
                  <span>
                    <FaRegHeart size={22} />
                  </span>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Home;
