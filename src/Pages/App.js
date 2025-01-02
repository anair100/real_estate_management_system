import React, { useState } from 'react';
import './App.css';

const HomePage = () => {
  const [type, setType] = useState('House');
  const [transactionType, setTransactionType] = useState('Rent');
  
  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li>Home</li>
            <li>Legal Consultancy</li>
            <li>Properties</li>
            <li>Sign Up</li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <img
          src="house-icon.png" // Placeholder for the house icon
          alt="House Icon"
          className="house-icon"
        />
        <h1>Find Your Dream Home!</h1>

        <div className="search-bar">
          <input type="text" placeholder="Enter Location" />
          <button><i className="fas fa-search"></i></button>
        </div>

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
          <button className="add-button">Add Property</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
