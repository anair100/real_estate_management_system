import React, { useState } from 'react';
import '../styles/Home.css';
import {Route, Routes, Link } from "react-router-dom";
import home_image from '../resources/home_image.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResult from './SearchResult';
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router';

 function Home() {
  const [type, setType] = useState('House');
  const [transactionType, setTransactionType] = useState('Rent');
  const [formData, setFormData] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    size: '',
    type: '',
    rentOrSell: 'rent',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();    
    navigate(`/search?${queryParams}`);
  };
  
  return (
      <div className="main-content">
       <Container  fluid style={{ backgroundColor: "#96E3E4", padding: "20px" }}>
          <Image style={{ width: "30%", height: "auto" }} src={home_image} />
       </Container>
       <Container className="input-container">
        <h1 class="h1">Find Your Dream Home!</h1>

        {/* <div className="search-bar">
          <input type="text" placeholder="Enter Location" />
          <button><i className="fas fa-search"></i></button>
        </div>
s
        <div className="transaction-type">
          <button
            className={transactionType === 'Rent' ? 'active' : ''}
            onClick={() => setTransactionType('Rent')}
          >
            Rent
          </button>
          <button
            className={transactionType === 'Buy' ? 'active' : ''}
            onClick={() => setTransactionType('Buy')}
          >
            Buy
          </button>
        </div>

        <div className="filters">
          <div className="property-type">
            <label>
              <input
                type="radio"
                value="House"
                checked={type === 'House'}
                onChange={(e) => setType(e.target.value)}
              />
              House
            </label>
            <label>
              <input
                type="radio"
                value="Plots"
                checked={type === 'Plots'}
                onChange={(e) => setType(e.target.value)}
              />
              Plots
            </label>
            <label>
              <input
                type="radio"
                value="Flats"
                checked={type === 'Flats'}
                onChange={(e) => setType(e.target.value)}
              />
              Flats
            </label>
          </div>

          <div className="price-filter">
            <label>Price:</label>
            <input type="range" min="0" max="1000000" />
          </div>

          <div className="square-ft-filter">
            <label>Square Ft:</label>
            <input type="number" placeholder="Min" />
            <input type="number" placeholder="Max" />
          </div>
        </div> */}

 <form onSubmit={handleSearch} style={{ display: 'grid', gap: '10px', maxWidth: '500px', margin: '0 auto' } }method="post">
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <input type="number" name="priceMin" placeholder="Min Price" value={formData.priceMin} onChange={handleChange} />
      <input type="number" name="priceMax" placeholder="Max Price" value={formData.priceMax} onChange={handleChange} />
      <input type="number" name="size" placeholder="Size (sq ft)" value={formData.size} onChange={handleChange} />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="">Select Type</option>
        <option value="flat">Flat</option>
        <option value="plot">Plot</option>
        <option value="house">House</option>
        <option value="land">Land</option>
      </select>
      <div>
        <label>
          <input type="radio" name="rentOrSell" value="rent" checked={formData.rentOrSell === 'rent'} onChange={handleChange} />
          Rent
        </label>
        <label>
          <input type="radio" name="rentOrSell" value="sell" checked={formData.rentOrSell === 'sell'} onChange={handleChange} />
          Sell
        </label>
      </div>
      <button type="submit">Search Properties</button>
    </form>

        <div className="buttons">
          {/* <button className="search-button" >Search Properties</button> */}
          <Link to="/add" className="add-button">Add Property</Link>
        </div>
       </Container>
      </div>
  );
}

export default Home;
