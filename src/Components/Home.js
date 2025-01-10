import React, { useState } from 'react';
import '../styles/Home.css';
import {Route, Routes, Link } from "react-router-dom";
import home_image from '../resources/home_image.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResult from './SearchResult';
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router';
import MultiRangeSlider from "multi-range-slider-react";

 function Home() {
  const [formData, setFormData] = useState({
    location: '',
    priceMin: 0,
    priceMax: 100,
    minSize: 0,
    maxSize: 100,
    type: 'House',
    rentOrSell: 'Sell',
  });

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

  const [activeTab, setActiveTab] = useState("House");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormData((prevData) => ({
      ...prevData,
      type: tab,
    }));
  };

  const renderTypesForSell = () => {
    return(<div style={{ display: "flex", cursor: "pointer", fontSize: "1.5vw", fontWeight: "", width: "60%"}}>
    { ["House", "Plot", "Flat", "Land"].map((tab) => (
    <div
     key={tab}
     name="type"
     onClick={() => handleTabClick(tab)}
     style={{padding: "0.1vw 0.1vw", borderBottom: activeTab === tab ? "0.1vw solid black" : "0.2vw  inset #F1F2F2", 
       width: "25%"}}>
     {tab}
    </div>
    ))}</div>)}

const renderTypesForRent = () => {
  return(<div style={{ display: "flex", cursor: "pointer", fontSize: "1.5vw", fontWeight: "", width: "60%"}}>
  { ["House", "Flat"].map((tab) => (
  <div
   key={tab}
   name="type"
   onClick={() => handleTabClick(tab)}
   style={{padding: "0.1vw 0.1vw", borderBottom: activeTab === tab ? "0.1vw solid black" : "0.2vw  inset #F1F2F2", 
     width: "25%"}}>
   {tab}
  </div>
  ))}</div>)}

  const renderSizeForFlat = () => {
    return(<div style={{ display: "flex", cursor: "pointer", fontSize: "1.5vw", fontWeight: "", width: "70%"}}>
    { ["1 BHK", "2 BHK", "3 BHK", "More"].map((tab) => (
    <div
     key={tab}
     name="type"
     onClick={() => handleTabClick(tab)}
     style={{padding: "0.1vw 0.1vw", borderBottom: activeTab === tab ? "0.1vw solid black" : "0.2vw  inset #F1F2F2", 
       width: "25%"}}>
     {tab}
    </div>
    ))}</div>)}

  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(80);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    setMaxValue(value);
  };


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
       <Container className="input-container" style={{width: "47%", marginTop: "2vh"}}>
        <h1 style={{ fontSize: "4vw", fontStyle: "italic", marginTop: "2vw", fontFamily: "Inria Serif", 
          width: "100%", margin: "auto", marginBottom: "0vw", padding: "0vw"}}>
          Find Your Dream Home!</h1>
        <input type="text" name="location" placeholder="Enter Location" value={formData.location} onChange={handleChange} 
         style = {{backgroundColor: "#F1F2F2", marginTop: "1.5vw", marginBottom: "0vw", width: "60%", 
         fontSize: "1.5vw", borderRadius: "5vw", padding: "0vw"}}/>
        
        <div style = {{ display: "flex", width: "60%", marginLeft: "2vw", marginBottom: "0vw", marginTop: "1vw"}}>
         <div style={{ fontSize: "1.5vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "bold", width: "40%"}}>
            Looking For:</div>
         <div style={{display: "flex", padding: "0", margin: "0", width: "60%"}}>
          <label style = {{fontSize: "1.5vw", display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "bold", 
           width: "40%", borderWidth: "0.1vw", borderColor: "#ccc",  padding: "1vw", boxSizing: "border-box"}}>
           <input type="radio" name="rentOrSell" value="Sell"
            checked={formData.rentOrSell === 'Sell'} onChange={handleChange}
            style={{ appearance: "none", width: "1vw", height: "1vw", border: "0.2vw solid black", borderRadius: "50%", 
              outline: "none", cursor: "pointer",  transition: "background-color 0.3s", borderColor: "0.3s", marginRight: "0.5vw"}}
           />Sell
          </label>
          <label style={{fontSize: "1.5vw", display: "flex", alignItems: "center", cursor: "pointer", fontWeight: "bold", 
           width: "60%", borderWidth: "0.1vw", borderColor: "#ccc",  padding: "1vw", boxSizing: "border-box"}}>
           <input type="radio" name="rentOrSell" value="Rent" checked={formData.rentOrSell === 'Rent'} onChange={handleChange}
            style={{appearance: "none", width: "1vw", height: "1vw", border: "0.2vw solid black", borderRadius: "50%", 
              outline: "none", cursor: "pointer",  transition: "background-color 0.3s", borderColor: "0.3s", marginRight: "0.5vw"}}
           />Rent
          </label>
         </div>
        </div>

        <div style = {{ display: "flex", width: "70%", marginLeft: "2vw", marginTop: "0"}}>
         <div style={{ fontSize: "1.5vw", display: "flex", padding: "0", fontWeight: "bold", width: "39%", alignItems: "center"}}>
          Property Type: </div>
          {formData.rentOrSell === 'Sell' && renderTypesForSell()}
          {formData.rentOrSell === 'Rent' && renderTypesForRent()}
        </div>

        <div className="double-range-container">
         {/* <div style={{ fontSize: "1.5vw", display: "flex", padding: "0", fontWeight: "bold", padding: "0", 
          alignItems: "center", marginBottom: "0.5vh", width: "20%"}}>Budget: </div> */}
          <div className="slider-container"> 
        {/* Highlighted Range */}
          <div
          className="slider-range"
          style={{
            left: `${minValue}%`,
            right: `${100 - maxValue}%`,
          }}
        ></div>

        {/* Min Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={minValue}
          onChange={handleMinChange}
          className="slider-thumb"
        />

        {/* Max Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={maxValue}
          onChange={handleMaxChange}
          className="slider-thumb"
        />
      </div>
        </div>

        <div style = {{display: "flex", width: "60%", marginLeft: "2vw", width: "60%", marginTop: "1vw"}}>
         <div style={{fontSize: "1.5vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "bold",
          width: "16%", }}>Size: </div>
          {renderSizeForFlat()}
        </div>
        
        <div style = {{marginTop: "4vw", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0vw", padding: "0"}}>
         <button style = {{backgroundColor: "#B9B8E3", borderRadius: "5vw", fontSize: "1.2vw", fontWeight: "bold", padding: "1vw 2.5vw", 
          border: "none"}} onClick = {handleSearch}>Search</button>        
        </div>
        <div style = {{marginTop: "1vw", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Link style = {{backgroundColor: "#72A7CF", borderRadius: "5vw", fontSize: "1.2vw", fontWeight: "bold", padding: "1vw 3vw", 
          border: "none"}} onClick = {handleSearch}>Add Property</Link>
        </div>
       </Container>
      </div>
  );
}

export default Home;
