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
    size:'',
    googleLocation: '',
    images: null,
    videos: null,
    rentOrSell: 'Sell'
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
    data.append('key1','value1');
    console.log("Inspecting formData:" ,formData);
    console.log("Inspecting data:" ,data);
for (let [key, value] of data.entries()) {
  console.log(key, value);
}

    try {
      console.log('data',data);
    //  const response = await fetch('http://localhost:8080/api/properties/add',{
    //     method :'POST',
    //     body:data,
    //     // headers:{
    //     //   'Content-Type':'application/json'
    //     // }
    //   })
      const response  = await api.post('/add', data);
      

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
    <Container style={{width: isMobile ? "90%" : "50%", marginTop: "2vh", borderStyle: "hidden", borderRadius: "20px", padding: "0",
     width: "50%", height: "auto", backgroundColor: "#FAFEFF", marginLeft: "10vw", marginRight: "10vw", position: "relative",
     marginTop: "3vh"}}>
    <div style = {{ display: "flex", width: "80%", marginLeft: "2vw", marginBottom: isMobile? "2vw": "1vw", marginTop: "0"}}>
         <div style={{ fontSize: isMobile? "4vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
            Looking For:</div>
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
      <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
      <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <input name="googleLocation" placeholder="Google Location" value={formData.googleLocation} onChange={handleChange} required />
      <label>Images:</label>
      <input type="file" name="images" multiple onChange={handleChange} />
      <label>Videos:</label>
      <input type="file" name="videos" multiple onChange={handleChange} />
      <button onSubmit={handleSubmit} type="submit">Add Property</button>
    </Container>
    </div>
  );
};

export default AddPropertyForm;
