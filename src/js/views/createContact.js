import React, { useState, useContext, useEffect, createElement } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/createContact.css";

export const CreateContact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const loadContactData = () => {
    fetch("https://playground.4geeks.com/apis/fake/contact/agenda/gonchip")
      .then((response) => {
        if (!response.ok) {
          
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((responseAsJson) => {
        actions.contactsLoad(responseAsJson)
      })
      .catch((error) => {
        console.error("Error al cargar los contactos:", error)
      });
  };

  const saveContact = () => {

    const response = actions.createContact(contact)

    if (response) {
       navigate("/")
       window.location.reload()
    } else {
      alert("Completa todos los campos.")
    }
  };


  return (
    <div className="container-div">
      <h1>Create Contact</h1>

      <div className="input-holder">
        <input
          type="text"
          name="full_name"
          value={contact.full_name}
          onChange={handleInputChange}
          placeholder="Full name"
        />
      </div>

      <div className="input-holder">
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleInputChange}
          placeholder="Enter Email"
        />
      </div>

      <div className="input-holder">
        <input
          type="tel"
          name="phone"
          value={contact.phone}
          onChange={handleInputChange}
          placeholder="Enter Phone"
        />
      </div>

      <div className="input-holder">
        <input
          type="text"
          name="address"
          value={contact.address}
          onChange={handleInputChange}
          placeholder="Enter Address"
        />
      </div>

      <button onClick={saveContact}>Save</button>

      <Link to="/">Get Back to Contacts</Link>
    </div>
  );
};