import React, { useState, useEffect, useRef } from 'react';
import '../styles/Home.css';
import { Route, Routes, Link } from "react-router-dom";
import home_image from '../resources/home_image.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router';


function Home() {
  const [locations, setLocations] = useState([]);
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [formData, setFormData] = useState({
    location: '',
    priceMin: 100000,
    priceMax: 9900000,
    minSize: 100,
    maxSize: 5000,
    type: 'House',
    rentOrSell: 'Sell',
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    if (radio.checked) {
      radio.style.backgroundColor = '#007BFF'; // Highlight background
      radio.style.borderColor = 'black'; // Darker border
    }
  });
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
    return (<div style={{ display: "flex", cursor: "pointer", fontSize: isMobile ? "4vw" : "2vw", fontWeight: "", width: "60%" }}>
      {["House", "Plot", "Flat", "Land"].map((tab) => (
        <div
          key={tab}
          name="type"
          onClick={() => handleTabClick(tab)}
          style={{
            padding: "0.05vw 0.05vw", borderBottom: activeTab === tab ? "0.2vw solid black" : "0.2vw  inset #F1F2F2",
            width: "25%"
          }}>
          {tab}
        </div>
      ))}</div>)
  }

  const renderTypesForRent = () => {
    return (<div style={{ display: "flex", cursor: "pointer", fontSize: isMobile ? "4vw" : "2vw", fontWeight: "", width: "60%" }}>
      {["House", "Flat"].map((tab) => (
        <div
          key={tab}
          name="type"
          onClick={() => handleTabClick(tab)}
          style={{
            padding: "0.1vw 0.1vw", borderBottom: activeTab === tab ? "0.1vw solid black" : "0.2vw  inset #F1F2F2",
            width: "25%"
          }}>
          {tab}
        </div>
      ))}</div>)
  }

  const renderSizeForFlat = () => {
    return (<div style={{ display: "flex", cursor: "pointer", fontSize: "1.5vw", fontWeight: "", width: "70%" }}>
      {["1 BHK", "2 BHK", "3 BHK", "More"].map((tab) => (
        <div
          key={tab}
          name="type"
          onClick={() => handleTabClick(tab)}
          style={{
            padding: "0.1vw 0.1vw", borderBottom: activeTab === tab ? "0.1vw solid black" : "0.2vw  inset #F1F2F2",
            width: "25%"
          }}>
          {tab}
        </div>
      ))}</div>)
  }

  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(99);
  const [minSize, setMinSize] = useState(100);
  const [maxSize, setMaxSize] = useState(5000);
  const [budgetType, setBudgetType] = useState('Lakh');
  const [sizeType, setSizeType] = useState('Square Feet'); 
  
  const handleBudgetTypeChange = (e) => {
    var minimumBudget = minValue;
    var maximumBudget = maxValue;
    setBudgetType(e.target.value);
    if(e.target.value == 'Lakh'){
      minimumBudget = minimumBudget*100000;
      maximumBudget = maximumBudget*100000;
    } else if(e.target.value == 'Thousand'){
      minimumBudget = minimumBudget*1000;
      maximumBudget = maximumBudget*1000;
    } else if(e.target.value = 'Crore'){
      minimumBudget = minimumBudget*10000000;
      maximumBudget = maximumBudget*10000000;
    }
    setFormData((prev) => ({
      ...prev,
      priceMin: minimumBudget,
      priceMax: maximumBudget
    }));
  };

  const handleSizeTypeChange = (e) => {
    var minimumSize = minSize;
    var maximumSize = maxSize;
    setSizeType(e.target.value);
    if(e.target.value == 'Acre'){
      minimumSize = minimumSize*43560;
      maximumSize = maximumSize*43560;
    } else if(e.target.value = 'Bigha'){
      minimumSize = minimumSize*12000;
      maximumSize = maximumSize*12000;
    }
    setFormData((prev) => ({
      ...prev,
      minSize: minimumSize,
      maxSize: maximumSize
    }));
  };

  const handleMinChange = (e) => {
    var value = Math.min(Number(e.target.value), maxValue - 1);
    console.log('Budget Type: ' + budgetType);
    setMinValue(value);
    if(budgetType == 'Lakh'){
      value = value*100000;
    } else if(budgetType == 'Thousand'){
      value = value*1000;
    } else if(value = 'Crore'){
      value = value*10000000;
    }
    setFormData((prev) => ({
      ...prev,
      priceMin: value,
    }));
  };

  const handleMaxChange = (e) => {
    var value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    if(budgetType == 'Lakh'){
      value = value*100000;
    } else if(budgetType == 'Thousand'){
      value = value*1000;
    } else if(value = 'Crore'){
      value = value*10000000;
    }
    setFormData((prev) => ({
      ...prev,
      priceMax: value,
    }));
  };

  const handleMinSizeChange = (e) => {
    var value = Math.min(Number(e.target.value), maxSize - 1);
    setMinSize(value);
    if(sizeType == 'Acre'){
      value = value*43560;
    } else if(sizeType == 'Bigha'){
      value = value*12000;
    }
    setFormData((prev) => ({
      ...prev,
      minSize: value,
    }));
  };

  const handleMaxSizeChange = (e) => {
    var value = Math.max(Number(e.target.value), minSize + 1);
    setMaxSize(value);
    if(sizeType == 'Acre'){
      value = value*43560;
    } else if(sizeType == 'Bigha'){
      value = value*12000;
    }
    setFormData((prev) => ({
      ...prev,
      maxSize: value,
    }));
  };

  const handleMinInputChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
  };

  const handleMaxInputChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
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
      const response = await fetch(`http://localhost:8080/api/properties/address?location=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();

      // Update suggestions state
      console.log('data', data, data.length);
      setLocations(data || []);
      console.log('locations', locations, locations.length);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  function useDebounce(value, delay) {
    console.log('inside useDebounce');
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      console.log('inside useEffect with value', value);
      const handler = setTimeout(() => {
        console.log('inside setTimeout with value', value);
        setDebouncedValue(value)
      }, delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  }

  // In your component:
  
  const debouncedQuery = useDebounce(formData.location, 500);
  useEffect(() => {
    // if (debouncedQuery.trim() !== '') {
    if (focused) {
      fetchSuggestions(debouncedQuery);
    }
    // }
  }, [debouncedQuery]);

  // Handle outside click to set suggetion [] or to remove suggetion box
  useEffect(() => {
    // console.log("Inside effect to clear sugetion");
    const handleClickOutside = (event) => {
      // console.log("Inside handleClickOutside:",inputRef.current,event.target);
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // console.log("Inside handleClickOutside");
        setLocations([]); // Clear suggestions if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", maxWidth: "100%", width: "100%", marginBottom: "0", backgroundColor: "#F1F2F2", padding: "0" }}>
      <div style={{ backgroundColor: isMobile ? "#96E3E4" : "#96E3E4", padding: "20px" }}>
        <Image style={{ width: isMobile ? "50%" : "25%", height: "auto" }} src={home_image} />
      </div>
      <Container className="input-container" style={{ width: isMobile ? "90%" : "50%", marginTop: "2vh" }}>
        <h1 style={{
          fontSize: isMobile ? "8vw" : "4vw", fontStyle: "italic", marginTop: "2vw", fontFamily: "Inria Serif",
          width: "100%", margin: "auto", marginBottom: isMobile ? "2.5vw" : "1.2vw", padding: "0vw"
        }}>
          Find Your Dream Home!</h1>
        <div  ref={inputRef}>
          <div>
            <input
              type="text"
              name="location"
              placeholder="Enter Location"          
              value={formData.location}
              onChange={handleChange}
              onFocus={() => setFocused(true)} // Show suggestions when focused
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
              <ul style={{
                position: 'absolute', //  Make it float
                top: '25%', // Place it below the input
                left: '25%',
                width: '40%',
                backgroundColor: '#fff', // Transparent background
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '0',
                border: '1px solid #ccc',
                borderTop: 'none',
                margin: '0',
                //  listStyle: 'none',
                zIndex: 1000,
                borderRadius: '0.5vw',
                maxHeight: '10vw', // Limit height to make it scrollable
                overflowY: 'auto', // Enable scrolling
                //  backdropFilter: 'blur(10px)', // Optional: add a blur effect
              }}>
                {locations.map((suggestion, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '0.5vw 1vw',
                      cursor: 'pointer',
                      // borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'white',
                    }}

                    onClick={() => {
                      setFormData({ location: suggestion.location });
                      setLocations([]);
                    }
                    }
                  >
                    {suggestion.location}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div style={{ display: "flex", width: isMobile? "100%": "80%", marginLeft: "2vw", marginBottom: isMobile ? "2vw" : "1vw", marginTop: "0"}}>
          <div style={{ fontSize: isMobile ? "5vw" : "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
            Looking For:</div>
          <div style={{ display: "flex", padding: "0", margin: "0", width: isMobile? "60%": "50%"}}>
            <label style={{fontSize: isMobile ? "5vw" : "2vw", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontWeight: "500",
              width: "50%", borderWidth: "0.1vw", borderColor: "#ccc", padding: "0vw", boxSizing: "border-box"}}>
              <input type="radio" name="rentOrSell" value="Sell"
                checked={formData.rentOrSell === 'Sell'} onChange={handleChange}
                style={{
                  appearance: "none", width: isMobile ? "3vw" : "1vw", height: isMobile ? "3vw" : "1vw", border: "0.2vw solid black", borderRadius: "50%",
                  outline: "none", cursor: "pointer", transition: "background-color 0.3s", borderColor: "0.3s", marginRight: "0.5vw", marginLeft: isMobile ? "5vw" : "3vw"
                }}
              />Buy
            </label>
            <label style={{fontSize: isMobile ? "5vw" : "2vw", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontWeight: "500",
              width: "50%", borderWidth: "0.1vw", borderColor: "#ccc", padding: "0vw", boxSizing: "border-box"}}>
              <input type="radio" name="rentOrSell" value="Rent" checked={formData.rentOrSell === 'Rent'} onChange={handleChange}
                style={{
                  appearance: "none", width: isMobile ? "3vw" : "1vw", height: isMobile ? "3vw" : "1vw", border: "0.2vw solid black", borderRadius: "50%",
                  outline: "none", cursor: "pointer", transition: "background-color 0.3s", borderColor: "0.3s", marginRight: "0.5vw"
                }}
              />Rent
            </label>
          </div>
        </div>

        <div style={{ display: "flex", width: isMobile ? "100%" : "95%", marginLeft: "2vw", marginTop: "0", padding: "0", marginBottom: isMobile ? "4vw" : "1.5vw" }}>
          <div style={{ fontSize: isMobile ? "4.5vw" : "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500", marginRight: isMobile ? "2vw" : "1.4vw" }}>
            Property Type: </div>
          {formData.rentOrSell === 'Sell' && renderTypesForSell()}
          {formData.rentOrSell === 'Rent' && renderTypesForRent()}
        </div>

        <div style={{ display: "flex", width: isMobile? "90%": "80%", marginLeft: "2vw", marginTop: "0", padding: "0", marginBottom: isMobile ? "2vw" : "1vw"}}>
          <div style={{fontSize: isMobile ? "5vw" : "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500",
            marginRight: isMobile ? "2.5vw" : "1.4vw"
          }}>Budget: </div>
          <div className="slider-container">
            <div className="slider-track"></div>
            <div className="slider-highlight" style={{ left: `${((minValue - 1) / 99) * 100}%`,  width: `${((maxValue - minValue) / 98) * 100}%`}}></div>
            <input type="range" min="1" max="99" value={minValue} onChange={handleMinChange} className="slider-thumb slider-thumb-left" />
            <input type="range" min="1" max="99" value={maxValue} onChange={handleMaxChange} className="slider-thumb slider-thumb-right" />
          </div>
        </div>
        <div style={{ display: "flex",  flexWrap: "wrap", alignItems: "center", marginLeft: isMobile ? "22.5vw" : "11.5vw", width: isMobile? "70%":"75%", padding: "0", marginTop: "0", 
          marginBottom: isMobile ? "4vw" : "1vw", justifyContent: isMobile ? "flex-start" : "space-between"}}>
          <label style={{ fontSize: isMobile ? "5vw" : "1.2vw"}}>Min: </label>
          <input style={{ width: isMobile? "25%": "15%", marginLeft: isMobile? "2vw":"1vw", fontSize: isMobile ? "4.5vw" : "1.2vw", borderRadius: isMobile? "7vw": "5vw",
           padding: "0.2vw 0.5vw", border: "1px solid #ccc" }}
            id="min-input"
            type="number"
            value={minValue}
            onChange={handleMinInputChange}
            min="1"
            max="99"
          />
          <label style={{ fontSize: isMobile ? "4.5vw" : "1.2vw", marginLeft: isMobile ? "3vw" : "1.5vw" }}>Max: </label>
          <input style={{ width: isMobile? "25%": "15%", marginLeft: isMobile? "2vw":"1vw", fontSize: isMobile ? "4.5vw" : "1.2vw", 
            borderRadius: "5vw", padding: "0.2vw 0.5vw", border: "1px solid #ccc" }}
            id="max-input"
            type="number"
            value={maxValue}
            onChange={handleMaxInputChange}
            min="1"
            max="99"
          />
          <select name="budgetType" defaultValue="Lakh" onChange = {handleBudgetTypeChange} style={{marginLeft: isMobile? "0": "1.5vw", padding: "0.3vw", 
            borderRadius: "0.5vw", borderStyle: "ridge", fontSize: isMobile? "4.5vw": "1.2vw", borderRadius: "5vw", width: isMobile? "42%": "25%", marginTop: isMobile? "2vw": "0"}}>
           <option value="Lakh">Lakh</option>
           <option value="Thousand">Thousand</option>
           <option value="Crore">Crore</option>
          </select>
        </div>

        <div style={{ display: "flex", width: isMobile? "90%": "80%", marginLeft: "2vw", marginTop: "0", padding: "0", marginBottom: isMobile? "2vw": "1vw"}}>
          <div style={{fontSize: isMobile ? "5vw" : "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500",
            marginRight: isMobile ? "2vw" : "5.3vw"}}>Size: </div>
          <div className="slider-container" style = {{marginLeft: isMobile? "8.5vw": "0"}}>
            <div className="slider-track"></div>
            <div className="slider-highlight" style={{ left: `${((minSize - 100) / 5000) * 100}%`, width: `${((maxSize - minSize) / 4900) * 100}%`}}></div>
            <input type="range" min="100" max="5000" value={minSize} onChange={handleMinSizeChange} className="slider-thumb slider-thumb-left" />
            <input type="range" min="100" max="5000" value={maxSize} onChange={handleMaxSizeChange} className="slider-thumb slider-thumb-right" />
          </div>
        </div>
        <div style={{ display: "flex",  flexWrap: "wrap", alignItems: "center", marginLeft: isMobile ? "22.5vw" : "11.5vw", width: isMobile? "70%":"75%", padding: "0", marginTop: "0", 
          marginBottom: isMobile ? "4vw" : "1vw", justifyContent: isMobile ? "flex-start" : "space-between"}}>
          <label style={{ fontSize: isMobile ? "5vw" : "1.2vw" }}>Min: </label>
          <input style={{ width: isMobile? "25%": "15%", marginLeft: isMobile? "2vw":"1vw", fontSize: isMobile ? "4.5vw" : "1.2vw", borderRadius: isMobile? "7vw": "5vw",
           padding: "0.2vw 0.5vw", border: "1px solid #ccc"  }}
            id="min-input"
            type="number"
            value={minSize}
            onChange={handleMinInputChange}
            min="100"
            max="5000"
          />
          <label style={{ fontSize: isMobile ? "4.5vw" : "1.2vw", marginLeft: isMobile ? "3vw" : "1.5vw" }}>Max: </label>
          <input style={{ width: isMobile? "25%": "15%", marginLeft: isMobile? "2vw":"1vw", fontSize: isMobile ? "4.5vw" : "1.2vw", 
            borderRadius: "5vw", padding: "0.2vw 0.5vw", border: "1px solid #ccc" }}
            id="max-input"
            type="number"
            value={maxSize}
            onChange={handleMaxInputChange}
            min="100"
            max="5000"
          />
          <select name = "sizeType" defaultValue="Square Feet" onChange = {handleSizeTypeChange}
           style={{marginLeft: isMobile? "0": "1.5vw", padding: "0.3vw", 
            borderRadius: "0.5vw", borderStyle: "ridge", fontSize: isMobile? "4.5vw": "1.2vw", borderRadius: "5vw", width: isMobile? "52%": "25%", marginTop: isMobile? "2vw": "0"}}>
           <option value="Square Feet">Square Feet</option>
           <option value="Acre">Acre</option>
           <option value="Bigha">Bigha</option>
          </select>
        </div>

        <div style={{ marginTop: isMobile ? "12vw" : "4vw", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0vw", padding: "0" }}>
          <button style={{
            backgroundColor: "#B9B8E3", borderRadius: isMobile? "7vw": "5vw", fontSize: isMobile ? "5vw" : "1.5vw", fontWeight: "bold", padding: isMobile ? "2.5vw 10vw" : "0.8vw 5vw",
            border: "none"
          }} onClick={handleSearch}>Search</button>
        </div>
        <div style={{ marginTop: isMobile ? "2.5vw" : "1.5vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link to='/add' style={{
            backgroundColor: "#72A7CF", borderRadius: isMobile? "7vw": "5vw", fontSize: isMobile ? "5vw" : "1.5vw", fontWeight: "bold", padding: isMobile ? "2.5vw 15vw" : "0.8vw 8vw",
            border: "none", textDecoration: "none", color: "black"
          }} >Add Property</Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;
