import React, { useState } from 'react';
// import api from '../api/api';
import { Container, Row, Col, Image } from "react-bootstrap";
import home_image from '../resources/home_image.webp';


const AddPropertyForm = () => {
  console.log('Inside AddPropertyForm');
  const [formData, setFormData] = useState({
    type: '',
    price: '',
    phone: '',
    email: '',
    description: '',
    location: '',
    googleLocation: '',
    images: null,
    videos: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        if (key === 'images' || key === 'videos') {
          Array.from(formData[key]).forEach(file => data.append(key, file));
        } else {
          data.append(key, formData[key]);
        }
      }
    }
    try {
      // await api.post('/properties', data);
     const response = await fetch('http://localhost:8080/add',{
        method :'POST',
        body:JSON.stringify(formData),
        headers:{
          'Content-Type':'application/json'
        }
      })
      alert('Property added successfully');
      console.log(await response.json());
      // console.log(formData);
    } catch (error) {
      console.error(error);
      alert('Failed to add property');
    }
  };

  return (
   <div>
    <Container  fluid style={{ backgroundColor: "#96E3E4", padding: "20px" }}>
          <Image style={{ width: "30%", height: "auto" }} src={home_image} />
       </Container>
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
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
      <button type="submit">Add Property</button>
    </form>
    </div>
  );
};

export default AddPropertyForm;
