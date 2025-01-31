import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Image } from "react-bootstrap";
import home_image from '../resources/home_image.webp';
import api from './api';


const AddPropertyForm = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
     window.removeEventListener("resize", handleResize);
  }},[]);
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
      radioButtons.forEach((btn) => {
        btn.style.backgroundColor = ''; // Reset background
        btn.style.borderColor = '#black';
      });
      if (radio.checked) {
        radio.style.backgroundColor = '#007BFF'; // Highlight background
        radio.style.borderColor = '#black'; // Darker border
      }
    });
  });

  console.log('Inside AddPropertyForm');
  const [formData, setFormData] = useState({
    type: '',
    price: '',
    phone: '',
    email: '',
    description: '',
    location: '',
    googleLocation: '',
    rentOrSell: 'Sell',
    size:'',
    images: null,
    videos: null
  });

  const handleChange = (e) => {
    console.log('e=>',e.target);
    const { name, value, files } = e.target;
    if (files) {
      console.log('setting file',e.target.name,e.target.files);
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let key in formData) {     
      if (formData[key]) {        
        if (key === 'images' || key === 'videos') {
          console.log('img key',key);
          Array.from(formData[key]).forEach(file => data.append(key, file));
        } else {
          console.log('normal key',key,formData[key]);
          data.append(key, formData[key]);
        }
      }
    }
    
    console.log("Inspecting formData:" ,formData);
    console.log("Inspecting data:" ,data);
    for (let [key, value] of data.entries()) {
     console.log(key, value);
    }

    try {
      console.log('data',data);
      const response  = await api.post('http://localhost:8080/api/properties/add', data);
      alert('Property added successfully');
      console.log( response);
    } catch (error) {
      console.error(error);
      alert('Failed to add property');
    }
  };

  return (
    <div style = {{textAlign: "center", maxWidth: "100%", width: "100%", marginBottom: "0", backgroundColor: "#F1F2F2", padding: "0"}}>
    <div style={{ backgroundColor: isMobile? "#96E3E4": "#96E3E4", padding: "20px" }}>
       <Image style={{ width: isMobile? "50%": "25%", height: "auto" }} src={home_image} />
    </div>
    <Container className="input-container" style={{ width: isMobile ? "90%" : "50%", marginTop: isMobile? "5vw": "2vh", paddingTop: isMobile? "3vw": "1vw",
      borderStyle: "hidden", borderRadius: "20px", height: "auto", backgroundColor: "#FAFEFF"}}>
       <h1 style={{fontSize: "3vw", width: "100%", marginBottom: isMobile ? "2.5vw" : "1.2vw", padding: "0vw"}}>
          Add Property</h1>
       <div style = {{ display: "flex", width: "80%", marginLeft: "2vw", marginBottom: isMobile? "2vw": "1vw", marginTop: "0"}}>
         <div style={{ fontSize: isMobile? "4vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
            Looking To:</div>
         <div style={{display: "flex", padding: "0", margin: "0", width: "50%"}}>
          <label style = {{fontSize: isMobile? "4vw": "2vw", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontWeight: "500", 
           width: "50%", borderWidth: "0.1vw", borderColor: "#ccc",  padding: "0vw", boxSizing: "border-box"}}>
           <input type="radio" name="rentOrSell" value="Sell"
            checked={formData.rentOrSell === 'Sell'} onChange={handleChange}
            style={{ appearance: "none", width: isMobile? "1.5vw": "1vw", height:  isMobile? "1.5vw": "1vw", border: "0.2vw solid black", borderRadius: "50%", 
              outline: "none", cursor: "pointer",  transition: "background-color 0.3s", borderColor: "0.3s", marginRight: "0.5vw", marginLeft: isMobile? "5vw": "3vw"}}
           />Sell
          </label>
          <label style={{fontSize: isMobile? "4vw": "2vw", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontWeight: "500", 
           width: "50%", borderWidth: "0.1vw", borderColor: "#ccc",  padding: "0vw", boxSizing: "border-box", }}>
           <input type="radio" name="rentOrSell" value="Rent" checked={formData.rentOrSell === 'Rent'} onChange={handleChange}
            style={{appearance: "none", width: isMobile? "1.5vw": "1vw", height:  isMobile? "1.5vw": "1vw", border: "0.2vw solid black", borderRadius: "50%", 
              outline: "none", cursor: "pointer",  transition: "background-color 0.3s", borderColor: "0.3s", marginRight: "0.5vw"}}
           />Rent
          </label>
         </div>
       </div>
       <div style = {{ display: "flex", width: "80%", marginLeft: "2vw", marginBottom: isMobile? "2vw": "1vw", marginTop: "0"}}>
        <div style={{ fontSize: isMobile? "4vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Property Type:</div>
        <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
       </div>
       <div style = {{ display: "flex", width: "80%", marginLeft: "2vw", marginBottom: isMobile? "2vw": "1vw", marginTop: "0"}}>
        <div style={{ fontSize: isMobile? "4vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Locality:</div>
         <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required
         style = {{borderRadius: '1vw', borderStyle: "ridge", borderStyle: "ridge", borderColor: "#ddd", fontSize: isMobile? "4vw": "2vw"}}/>
       </div>
       <div style = {{ display: "flex", width: "80%", marginLeft: "2vw", marginBottom: isMobile? "2vw": "1vw", marginTop: "0"}}>
        <div style={{ fontSize: isMobile? "4vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Size:</div>
        <input name="size" placeholder="Enter Size" value={formData.size} onChange={handleChange} required 
         style = {{borderRadius: '1vw', borderStyle: "ridge", borderStyle: "ridge", borderColor: "#ddd", fontSize: isMobile? "4vw": "2vw"}}/>
       </div>
       <div>
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
       </div>
       <div>
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
       </div>
      
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
      <label>Images:</label>
      <input type="file" name="images" multiple onChange={handleChange} />
      <label>Videos:</label>
      <input type="file" name="videos" multiple onChange={handleChange} />
      <div style={{ marginTop: isMobile ? "12vw" : "4vw", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0vw", padding: "0" }}>
          <button style={{backgroundColor: "#B9B8E3", borderRadius: isMobile? "7vw": "5vw", fontSize: isMobile ? "5vw" : "1.5vw", 
          fontWeight: "500", padding: isMobile ? "2vw 10vw" : "0.8vw 5vw", border: "none"
          }} onClick={handleSubmit} type="submit">Add</button>
      </div>
    </Container>
    </div>
  );
};

export default AddPropertyForm;
