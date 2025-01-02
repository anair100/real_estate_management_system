import React, { useState } from 'react';
import './AddPropertyDetails.css'; // Import your CSS for styling

const AddPropertyDetails = () => {
  const [formData, setFormData] = useState({
    location: '',
    price: '',
    squareFeet: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="form-container">
      <h1>Add Real Estate Property</h1>
      <form onSubmit={handleSubmit} className="real-estate-form">
        <label>
          Property Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Property Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Size in Square Feet:
          <input
            type="text"
            name="squareFeet"
            value={formData.squareFeet}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Upload Image:
          <input
            type="file"
            name="image"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Current Location:
          <div id="google-map" className="map-container"></div>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPropertyDetails;