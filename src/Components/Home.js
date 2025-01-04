import React, { useState } from 'react';
import '../styles/Home.css';
import {Route, Routes, Link } from "react-router-dom";
import home_image from '../resources/home_image.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPropertyForm from './AddPropertyForm';
import { Container, Row, Col, Image } from "react-bootstrap";

 function Home() {
  const [type, setType] = useState('House');
  const [transactionType, setTransactionType] = useState('Rent');
  
  return (
      <div className="main-content">
       <Container  fluid style={{ backgroundColor: "#96E3E4", padding: "20px" }}>
          <Image style={{ width: "30%", height: "auto" }} src={home_image} />
       </Container>
       <Container className="input-container">
        <h1 class="h1">Find Your Dream Home!</h1>
        <div className="search-bar">
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
        </div>

        <div className="buttons">
          <button className="search-button">Search Properties</button>
          <Link to="/add" className="add-button">Add Property</Link>
        </div>
       </Container>
      </div>
  );
}

export default Home;
