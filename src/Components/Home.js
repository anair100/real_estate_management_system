import React, { useState } from 'react';
import '../styles/Home.css';
import {Route, Routes, Link } from "react-router-dom";
import home_image from '../resources/home_image.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResult from './SearchResult';
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router';

 function Home() {
  const min = 5;
  const max = 99;
  const step = 10;
  const [formData, setFormData] = useState({
    location: '',
    priceMin: min,
    priceMax: max,
    minSize: min,
    maxSize: max,
    type: '',
    rentOrSell: 'Sell'
  });
 
  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), formData.priceMax - step);
    setFormData({ ...formData, priceMin: value });
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), formData.priceMin + step);
    setFormData({ ...formData, priceMax: value });
  };

  const handleInputMinChange = (e) => {
    const minValue = Math.min(Number(e.target.value), formData.priceMax - step);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: minValue });
  };

  const handleInputMaxChange = (e) => {
    const maxValue = Math.max(Number(e.target.value), formData.priceMin + step);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: maxValue });
  };

  const [activeTab, setActiveTab] = useState("House");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();    
    console.log('calling /search');
    navigate(`/search?${queryParams}`);
  };

  return (
      <div className="main-content">
       <Container  fluid style={{ backgroundColor: "#96E3E4", padding: "20px" }}>
          <Image style={{ width: "25%", height: "auto" }} src={home_image} />
       </Container>
       <Container className="input-container" style={{width: "60%", marginTop: "2vh"}}>
        <h1 style={{ fontSize: "4vw", fontStyle: "italic", marginTop: "2vh", fontFamily: "Inria Serif", 
          width: "100%", margin: "auto", marginBottom: "0"}}>
          Find Your Dream Home!</h1>
        <input type="text" name="location" placeholder="Enter Location" value={formData.location} onChange={handleChange} 
         style = {{backgroundColor: "#F1F2F2", marginTop: "1vh", marginBottom: "0", width: "60%", fontSize: "2vw"}}/>
        
        <div style = {{ display: "flex", width: "60%", marginLeft: "4vw", marginBottom: "0", marginTop: "1vh", borderStyle: "solid"}}>
         <div style={{ fontSize: "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "bold", width: "40%"}}>
            Looking For:</div>
         <div style={{display: "flex", padding: "0", margin: "0", width: "60%", borderStyle: "solid"}}>
          <label style={{fontSize: "2vw", display: "flex", cursor: "pointer", fontWeight: "initial", width: "50%", borderStyle: "solid"}}>
           <input type="radio" name="rentOrSell" value="Sell"
            checked={formData.rentOrSell === 'Sell'} onChange={handleChange}
            style={{marginRight: "0.5vw", marginLeft: "0", transition: "transform 0.3s ease"}}
           />Sell
          </label>
          <label style={{fontSize: "2vw", display: "flex", cursor: "pointer", fontWeight: "initial", width: "50%", borderStyle: "solid"}}>
           <input type="radio" name="rentOrSell" value="Rent" checked={formData.rentOrSell === 'Rent'} onChange={handleChange}
            style={{marginRight: "0.5vw", marginLeft: "0", fontSize: "1vw"}}
           />Rent
          </label>
         </div>
        </div>

        <div style = {{ display: "flex", width: "90%", marginLeft: "4vw", marginTop: "0"}}>
         <div style={{ fontSize: "2vw", display: "flex", padding: "0", fontWeight: "bold", width: "30%", alignItems: "center"}}>
          Property Type: </div>
         <div style={{ display: "flex", cursor: "pointer", fontSize: "2vw", fontWeight: "", width: "70%"}}>
           {["House", "Plot", "Flat", "Land"].map((tab) => (
           <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{padding: "1vw 1vw", borderBottom: activeTab === tab ? "0.2vw solid black" : "0.2vw  inset #F1F2F2", 
              width: "25%"}}>
            {tab}
           </div>
           ))}
          </div>
        </div>

        <div style = {{display: "flex", width: "60%", marginLeft: "4vw", width: "70%", marginTop: "1.5vw", borderStyle: "solid"}}>
         <div style={{ fontSize: "2vw", display: "flex", padding: "0", fontWeight: "bold", padding: "0", alignItems: "center"}}>Budget: </div>
         <div style = {{marginLeft: "3vw"}}>
          <input type="range" min={min} max={max} step={step} value={formData.priceMin} onChange={handleMinChange} style = {{width: "10vw", marginTop: "1vw"}}/>
          <input type="range" min={min} max={max} step={step} value={formData.maxValue} onChange={handleMaxChange} style = {{width: "10vw", marginTop: "1vw"}}/>  
         </div>
        </div>
        <div style = {{display: "flex", marginLeft: "20vw", width: "20%"}}>
         <div>
          <input name="priceMin" type="number" min={min} max={formData.priceMax - step} value={formData.priceMin} onChange={handleInputMinChange}/>
         </div>
         <div>
          <input name="priceMax" type="number" min={formData.priceMin + step} max={max} value={formData.priceMax} onChange={handleInputMaxChange} style = {{marginLeft: "4.5vw"}}/>
         </div>
        </div>
        <div style = {{display: "flex", width: "60%", marginLeft: "4vw", width: "50%", marginTop: "1vw"}}>
         <div style={{ fontSize: "2vw", marginTop: "0.2vw", alignItems: "center",  marginBottom: "0",
          padding: "0,", fontWeight: "bold"}}>Size: </div>
         <div style = {{marginLeft: "6vw"}}>
          <input type="range" min={min} max={max} step={step} value={formData.priceMin} onChange={handleMinChange} style = {{width: "10vw", marginTop: "1vw"}}/>
          <input type="range" min={min} max={max} step={step} value={formData.maxValue} onChange={handleMaxChange} style = {{width: "10vw", marginTop: "1vw"}}/>  
         </div>
        </div>
        <div style = {{display: "flex", marginLeft: "20vw", width: "20%"}}>
         <div>
          <input name="priceMin" type="number" min={min} max={formData.priceMax - step} value={formData.priceMin} onChange={handleInputMinChange}/>
         </div>
         <div>
          <input name="priceMax" type="number" min={formData.priceMin + step} max={max} value={formData.priceMax} onChange={handleInputMaxChange} style = {{marginLeft: "4.5vw"}}/>
         </div>
        </div>

        <div style = {{marginTop: "2vh", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0vh", borderStyle: "solid"}}>
         <button style = {{backgroundColor: "#B9B8E3", borderRadius: "5vw", fontSize: "1.2vw", fontWeight: "bold", padding: "0.5vw 2.5vw", 
          border: "none"}} onClick = {handleSearch}>Search</button>        
        </div>

        <div style = {{marginTop: "1vh", display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "solid"}}>
        <Link style = {{backgroundColor: "#72A7CF", borderRadius: "5vw", fontSize: "1.2vw", fontWeight: "bold", padding: "0.5vw 3vw", 
          border: "none"}} to = '/add'>Add Property</Link>
        </div>
       </Container>
      </div>
  );
}

export default Home;
