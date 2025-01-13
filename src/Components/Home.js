import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import {Route, Routes, Link } from "react-router-dom";
import home_image from '../resources/home_image.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router';


 function Home() {
  const [minValue, setMinValue] = useState(50);
  const [maxValue, setMaxValue] = useState(150);
  const [locations, setLocations] = useState([]);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [formData, setFormData] = useState({
    location: '',
    priceMin: minValue,
    priceMax: maxValue,
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
    return(<div style={{ display: "flex", cursor: "pointer", fontSize: isMobile? "4vw": "2vw", fontWeight: "", width: "60%"}}>
    { ["House", "Plot", "Flat", "Land"].map((tab) => (
    <div
     key={tab}
     name="type"
     onClick={() => handleTabClick(tab)}
     style={{padding: "0.05vw 0.05vw", borderBottom: activeTab === tab ? "0.2vw solid black" : "0.2vw  inset #F1F2F2", 
       width: "25%"}}>
     {tab}
    </div>
    ))}</div>)}

  const renderTypesForRent = () => {
   return(<div style={{ display: "flex", cursor: "pointer", fontSize: isMobile? "4vw": "2vw", fontWeight: "", width: "60%"}}>
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

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };
  
  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    };
  
  const handleMinInputChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    if (!isNaN(value) && value >= 5) setMinValue(value);
  };
  
  const handleMaxInputChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    if (!isNaN(value) && value <= 200) setMaxValue(value);
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

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`http://localhost:8080/api/properties/address?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();

      // Update suggestions state
      console.log('data',data,data.length);
      setLocations(data || []);
      console.log('locations',locations,locations.length);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
  
    return debouncedValue;
  }
  
  // In your component:
  const debouncedQuery = useDebounce(formData.location, 300);
  useEffect(() => {
    // if (debouncedQuery.trim() !== '') {
      fetchSuggestions(debouncedQuery);
    // }
  }, [debouncedQuery]);

  return (
      <div className="main-content">
       <div style={{ backgroundColor: isMobile? "#96E3E4": "#96E3E4", padding: "20px" }}>
          <Image style={{ width: isMobile? "50%": "25%", height: "auto" }} src={home_image} />
       </div>
       <Container className="input-container" style={{width: isMobile ? "90%" : "50%", marginTop: "2vh"}}>
        <h1 style={{  fontSize: isMobile ? "7vw" : "4vw", fontStyle: "italic", marginTop: "2vw", fontFamily: "Inria Serif", 
          width: "100%", margin: "auto", marginBottom: isMobile? "2.5vw":"1.2vw", padding: "0vw"}}>
          Find Your Dream Home!</h1>
          <div>
          <div>
      <input
        type="text"
        name="location"
        placeholder="Enter Location"
        value={formData.location}
        onChange={handleChange}
        style={{
          backgroundColor: '#F1F2F2',
          marginTop: '0',
          marginBottom: isMobile ? '2vw' : '1.5vw',
          width: isMobile ? '80%' : '60%',
          fontSize: isMobile ? '3vw' : '1.5vw',
          borderRadius: '5vw',
          padding: isMobile ? '1vw 2vw' : '0.5vw 1vw',
          fontWeight: '500',
        }}
      />
      {/* Display Suggestions */}
      {locations.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1vw' }}>
          {locations.map((suggestion, index) => (
            <li
              key={index}
              style={{
                fontSize:10,
                background: '#fff',
                padding: '0.5vw 1vw',
                margin: '0.5vw 0',
                borderRadius: '0.5vw',
                cursor: 'pointer',
              }}
              onClick={() => setFormData({ location: suggestion.location })}
            >
              {console.log("suggestions"+suggestion.location)}
              {suggestion.location}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
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

        <div style = {{ display: "flex", width: isMobile? "100%": "95%", marginLeft: "2vw", marginTop: "0", padding: "0", marginBottom: isMobile? "2.5vw": "1.5vw"}}>
         <div style={{ fontSize: isMobile? "4vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500", marginRight: isMobile? "2vw": "1.4vw"}}>
          Property Type: </div>
          {formData.rentOrSell === 'Sell' && renderTypesForSell()}
          {formData.rentOrSell === 'Rent' && renderTypesForRent()}
        </div>

        <div style = {{ display: "flex", width: "80%", marginLeft: "2vw", marginTop: "0", padding: "0", marginBottom: isMobile? "1vw": "0.3vw"}}>
         <div style={{ fontSize: isMobile? "4vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500", 
          marginRight: isMobile? "2vw": "1.4vw"}}>Budget: </div>
         <div className="slider-container">
          <div className="slider-track"></div>
          <div className="slider-highlight" style={{  left: `${((minValue - 5) / 195) * 100}%`, width: `${((maxValue - minValue) / 195) * 100}%`}}></div>
          <input type="range" min="5" max="200" value={minValue} onChange={handleMinChange} className="slider-thumb slider-thumb-left"/>
          <input type="range" min="5" max="200" value={maxValue} onChange={handleMaxChange} className="slider-thumb slider-thumb-right"/>
         </div>
        </div>
        <div style = {{display: "flex", alignItems: "center", marginLeft: isMobile? "19vw": "11.5vw", width: "50%", padding: "0", marginTop: "0", marginBottom: isMobile? "1.5vw": "1vw"}}>
          <label style = {{fontSize: isMobile? "3vw": "1.5vw"}}>Min: </label>
          <input style = {{width: "25%", marginLeft: "1vw", fontSize: isMobile? "3vw": "1.5vw",   borderRadius: "10px", padding: "0.2vw 0.5vw",  border: "1px solid #ccc"}}
          id="min-input"
            type="number"
            value={minValue}
            onChange={handleMinInputChange}
            min="5"
            max={maxValue - 1}
          />
          <label style = {{fontSize: isMobile? "3vw": "1.5vw", marginLeft: isMobile? "6vw": "2vw"}}>Max: </label>
          <input  style = {{width: "25%", marginLeft: "1vw", fontSize: isMobile? "3vw": "1.5vw",   borderRadius: "10px", padding: "0.2vw 0.5vw",  border: "1px solid #ccc"}}
            id="max-input"
            type="number"
            value={maxValue}
            onChange={handleMaxInputChange}
            min={minValue + 1}
            max="200"
          />
        </div>

        <div style = {{ display: "flex", width: "80%", marginLeft: "2vw", marginTop: "0", padding: "0", marginBottom: isMobile? "1vw": "0.5vw"}}>
         <div style={{ fontSize: isMobile? "4vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500", 
          marginRight: isMobile? "2vw": "1.4vw"}}>Size: </div>
         <div className="slider-container">
          <div className="slider-track"></div>
          <div className="slider-highlight" style={{  left: `${((minValue - 5) / 195) * 100}%`, width: `${((maxValue - minValue) / 195) * 100}%`}}></div>
          <input type="range" min="5" max="200" value={minValue} onChange={handleMinChange} className="slider-thumb slider-thumb-left"/>
          <input type="range" min="5" max="200" value={maxValue} onChange={handleMaxChange} className="slider-thumb slider-thumb-right"/>
         </div>
        </div>
        <div style = {{display: "flex", alignItems: "center", marginLeft: isMobile? "19vw": "11.3vw", width: "50%", padding: "0", marginTop: "0", marginBottom: "0"}}>
          <label style = {{fontSize: isMobile? "3vw": "1.5vw"}}>Min: </label>
          <input style = {{width: "25%", marginLeft: "1vw", fontSize: isMobile? "3vw": "1.5vw",   borderRadius: "10px", padding: "0.2vw 0.5vw",  border: "1px solid #ccc"}}
          id="min-input"
            type="number"
            value={minValue}
            onChange={handleMinInputChange}
            min="5"
            max={maxValue - 1}
          />
          <label style = {{fontSize: isMobile? "3vw": "1.5vw", marginLeft: isMobile? "6vw": "2vw"}}>Max: </label>
          <input  style = {{width: "25%", marginLeft: "1vw", fontSize: isMobile? "3vw": "1.5vw",   borderRadius: "10px", padding: "0.2vw 0.5vw",  border: "1px solid #ccc"}}
            id="max-input"
            type="number"
            value={maxValue}
            onChange={handleMaxInputChange}
            min={minValue + 1}
            max="200"
          />
        </div>

        <div style = {{marginTop: isMobile? "6vw": "4vw", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0vw", padding: "0"}}>
         <button style = {{backgroundColor: "#B9B8E3", borderRadius: "5vw", fontSize: isMobile? "3vw": "1.5vw", fontWeight: "bold", padding: isMobile? "2.5vw 10vw": "0.8vw 5vw", 
          border: "none"}} onClick = {handleSearch}>Search</button>        
        </div>
        <div style = {{marginTop: isMobile? "2.5vw": "1.5vw", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <button to='/add' style =  {{backgroundColor: "#72A7CF", borderRadius: "5vw", fontSize: isMobile? "3vw": "1.5vw", fontWeight: "bold", padding: isMobile? "2.5vw 15vw": "0.8vw 8vw", 
          border: "none"}} >Add Property</button>
        </div>
       </Container>
      </div>
  );
}

export default Home;
