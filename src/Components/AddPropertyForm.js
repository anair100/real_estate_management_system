import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";
import home_image from '../resources/home_image.webp';
import api from './api';
import { BiPaperclip } from "react-icons/bi";

const AddPropertyForm = () => {
  const [imageNames, setImageNames] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    price: '',
    phone: '',
    email: '',
    description: '',
    location: '',
    googleLocation: '',
    rentOrSell: 'Sell',
    size:'',
    images: [],
    videos: null
  });
  
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
    if (radio.checked) {
      radio.style.backgroundColor = '#007BFF';
      radio.style.borderColor = 'black';
    }
   });
   radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
      radioButtons.forEach((btn) => {
        btn.style.backgroundColor = '';
        btn.style.borderColor = '#black';
      });

      if (radio.checked) {
        radio.style.backgroundColor = '#007BFF';
        radio.style.borderColor = '#black'
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
    return (<div style={{ display: "flex", flexWrap: "wrap", cursor: "pointer", fontSize: isMobile ? "5vw" : "2vw", width: isMobile? "65%": "60%", marginLeft: isMobile? "2vw": "0"}}>
      {["House", "Plot", "Flat", "Land"].map((tab) => (
        <div
          key={tab}
          name="type"
          onClick={() => handleTabClick(tab)}
          style={{
            padding: "0.05vw 0.05vw", borderBottom: activeTab === tab ? "0.2vw solid black" : "0.2vw  inset #F1F2F2", width: "25%"
          }}>
          {tab}
        </div>
      ))}</div>)
  }

  const renderTypesForRent = () => {
    return (<div style={{ display: "flex", cursor: "pointer", fontSize: isMobile ? "5vw" : "2vw", width: isMobile? "65%": "60%", marginLeft: isMobile? "2vw": "0"}}>
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

  const [sizeType, setSizeType] = useState('Square Feet'); 
  const [budgetType, setBudgetType] = useState('Lakh');
  const [size, setSize] = useState();
  const [price, setPrice] = useState();

  const handleSizeTypeChange = (e) => {
    var tempSize = size;
    setSizeType(e.target.value);
    if(e.target.value == 'Acre'){
      tempSize = tempSize*43560;
    } else if(e.target.value = 'Bigha'){
      tempSize = tempSize*12000;
    }
    setFormData((prev) => ({
      ...prev,
      size: tempSize,
    }));
  };

  const handleBudgetTypeChange = (e) => {
    var tempPrice = price;
    setBudgetType(e.target.value);
    if(e.target.value == 'Lakh'){
      tempPrice = tempPrice*100000;
    } else if(e.target.value == 'Thousand'){
      tempPrice = tempPrice*1000;
    } else if(e.target.value = 'Crore'){
      tempPrice = tempPrice*10000000;
    }
    setFormData((prev) => ({
      ...prev,
      price: tempPrice
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'size'){
      var tempSize = value;
      setSize(value)
      if(sizeType === 'Acre'){
        tempSize = value*43560;
      } else if(sizeType === 'Bigha'){
        tempSize = value*12000;
      }
      setFormData({ ...formData, [name]: tempSize });
    } else if(name === 'price'){
      setPrice(value);
      var tempPrice = value;
      setPrice(value)
      if(budgetType === 'Lakh'){
        tempPrice = value*100000;
      } else if(budgetType === 'Thousand'){
        tempPrice = value*1000;
      } else if(budgetType === 'Crore'){
        tempPrice = value*10000000;
      }
      setFormData({ ...formData, [name]: tempPrice });
    } else{
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFiles = (event) => {
    const files = Array.from(event.target.files);
    const updatedFiles = [...formData.images, ...files].slice(0, 5);

    if (updatedFiles.length > 5) {
      alert("You can upload a maximum of 5 images.");
      event.target.value = "";
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: updatedFiles,
    }));

    setImageNames(updatedFiles.map((file) => file.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let key in formData) {     
      if (formData[key]) {        
        if (key === 'images' || key === 'videos') {
          Array.from(formData[key]).forEach(file => data.append(key, file));
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    try {
      if (!formData.location.trim()) {
        alert("Please enter the property location");
      } else if(!formData.price){
        alert("Please enter the property price.");
      } else if(!formData.size){
        alert("Please enter the property size.");
      } else if(formData.images.length === 0){
        alert("Please upload atleast one property image.");
      } else {
        const response  = await api.post('http://localhost:8080/api/properties/add', data);
        //const response  = await api.post('/api/properties/add', data);
        alert('Property added successfully');
      }
    } catch (error) {
      alert('Failed to add property'+ error);
    }
  };

  return (
   <div style = {{textAlign: "center", width: "100%", width: "100%", marginBottom: "0", backgroundColor: "#F1F2F2", padding: "0"}}>
    <div style={{ backgroundColor: isMobile? "#96E3E4": "#96E3E4", padding: "20px" }}>
       <Image style={{ width: isMobile? "50%": "25%", height: "auto" }} src={home_image} />
    </div>
    <Container className="input-container" style={{ width: isMobile ? "90%" : "50%", marginTop: isMobile? "5vw": "2vh", paddingTop: isMobile? "3vw": "1vw",
      borderStyle: "hidden", borderRadius: "20px", height: "auto", backgroundColor: "#FAFEFF"}}>
       <h1 style={{fontSize: isMobile? "7vw": "3vw", width: "100%", marginBottom: isMobile ? "4vw" : "1.2vw", padding: "0vw"}}>
          Add Property</h1>
       <div style={{ display: "flex", width: "90%", marginLeft: "2vw", marginBottom: isMobile ? "2vw" : "1vw", marginTop: "0"}}>
        <div style={{ fontSize: isMobile ? "5vw" : "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
            Looking To:</div>
          <div style={{ display: "flex", padding: "0", margin: "0"}}>
            <label style={{fontSize: isMobile ? "5vw" : "2vw", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontWeight: "500",
               borderWidth: "0.1vw", borderColor: "#ccc", padding: "0vw", boxSizing: "border-box"}}>
              <input type="radio" name="rentOrSell" value="Sell" checked={formData.rentOrSell === 'Sell'} onChange={handleChange}
                style={{appearance: "none", width: isMobile ? "3vw" : "1vw", height: isMobile ? "3vw" : "1vw", border: "0.2vw solid black", borderRadius: "50%",
                outline: "none", cursor: "pointer", transition: "background-color 0.3s", borderColor: "0.3s", marginRight: isMobile? "1vw": "0.5vw", marginLeft: isMobile? "3.8vw": "3vw"}}
              />Sell
            </label>
            <label style={{fontSize: isMobile ? "5vw" : "2vw", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", fontWeight: "500",
              borderWidth: "0.1vw", borderColor: "#ccc", padding: "0vw", boxSizing: "border-box"}}>
              <input type="radio" name="rentOrSell" value="Rent" checked={formData.rentOrSell === 'Rent'} onChange={handleChange}
                style={{appearance: "none", width: isMobile ? "3vw" : "1vw", height: isMobile ? "3vw" : "1vw", border: "0.2vw solid black", borderRadius: "50%",
                  outline: "none", cursor: "pointer", transition: "background-color 0.3s", borderColor: "0.3s", marginRight: isMobile? "1vw": "0.5vw", marginLeft: isMobile ? "5vw" : "3vw"
                }}
              />Rent
            </label>
        </div>
       </div>
       <div style={{ display: "flex", width: isMobile ? "100%" : "95%", marginLeft: "2vw", marginTop: "0", padding: "0", marginBottom: isMobile ? "4vw" : "1.5vw"}}>
          <div style={{ fontSize: isMobile ? "5vw" : "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500", marginRight: isMobile ? "2vw" : "4.5vw"}}>
            Type: </div>
          {formData.rentOrSell === 'Sell' && renderTypesForSell()}
          {formData.rentOrSell === 'Rent' && renderTypesForRent()}
       </div>
       <div style = {{ display: "flex", width: "100%", marginLeft: "2vw", marginBottom: isMobile? "2vw": "1vw", marginTop: "2vw"}}>
        <div style={{ fontSize: isMobile? "5vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Locality:</div>
         <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required
          style = {{borderRadius: isMobile? "2vw": "1vw", borderStyle: "ridge", borderColor: "#ddd", fontSize: isMobile? "5vw": "2vw", 
          marginLeft: isMobile? "3vw": "2.3vw", paddingLeft: isMobile? "2vw": "1vw", width: "60%"}}/>
       </div>
       <div style = {{ display: "flex", width: "100%", marginLeft: "2vw", marginTop: isMobile? "4vw": "2vw"}}>
        <div style={{ fontSize: isMobile? "5vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Size:</div>
        <input name="size" type = "number" placeholder="Enter Size" value={size} onChange={handleChange} required 
          style = {{borderRadius: isMobile? "2vw": "1vw", borderStyle: "ridge", borderStyle: "ridge", borderColor: "#ddd", fontSize: isMobile? "5vw": "2vw", 
          marginLeft: isMobile? "11.3vw": "5.5vw", paddingLeft: isMobile? "2vw": "1vw", width: "40%"}}/>
        <select name = "sizeType" defaultValue="Square Feet" onChange = {handleSizeTypeChange}
           style={{marginLeft: isMobile? "3vw": "2vw", padding: "0.3vw", 
            borderRadius: "0.5vw", borderStyle: "ridge", fontSize: isMobile? "4.5vw": "1.2vw", borderRadius: "5vw", width: isMobile? "25%": "20%", marginTop: "0"}}>
           <option value="Square Feet">SqFt.</option>
           <option value="Acre">Acre</option>
           <option value="Bigha">Bigha</option>
          </select>
       </div>
       <div style = {{ display: "flex", width: "100%", marginLeft: "2vw", marginTop: isMobile? "4vw": "2vw"}}>
        <div style={{ fontSize: isMobile? "5vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Price:</div>
        <input name="price" type = "number" placeholder="Enter Price" value={price} onChange={handleChange} required 
         style = {{borderRadius: isMobile? "2vw": "1vw", borderStyle: "ridge", borderStyle: "ridge", borderColor: "#ddd", fontSize: isMobile? "5vw": "2vw", 
         marginLeft: isMobile? "9.2vw": "4.7vw", paddingLeft: isMobile? "2vw": "1vw", width: "40%"}}/>
          <select name="budgetType" defaultValue="Lakh" onChange = {handleBudgetTypeChange}  style={{marginLeft: isMobile? "3vw": "2vw", padding: "0.3vw", 
            borderRadius: "0.5vw", borderStyle: "ridge", fontSize: isMobile? "4.5vw": "1.2vw", borderRadius: "5vw", width: isMobile? "25%": "20%", marginTop: "0"}}>
           <option value="Lakh">Lac</option>
           <option value="Thousand">Th.</option>
           <option value="Crore">Cr.</option>
          </select>
       </div>
       <div style = {{ display: "flex", width: "100%", marginLeft: "2vw", marginTop: isMobile? "4vw": "2vw"}}>
        <div style={{fontSize: isMobile? "5vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Phone:</div>
        <input name="phone" placeholder="Enter Phone No." value={formData.phone} onChange={handleChange} required 
          style = {{borderRadius: isMobile? "2vw": "1vw", borderStyle: "ridge", borderStyle: "ridge", borderColor: "#ddd", fontSize: isMobile? "5vw": "2vw", 
          marginLeft: isMobile? "5.7vw": "3.5vw",  paddingLeft: isMobile? "2vw": "1vw", width: isMobile? "50%": "40%"}}/>
       </div>
       <div style = {{ display: "flex", width: "100%", marginLeft: "2vw", marginTop: isMobile? "4vw": "2vw"}}>
        <div style={{fontSize: isMobile? "5vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Description:</div>
        <textarea name="description" placeholder="About Property!" value={formData.description} onChange={handleChange} required>
         style = {{borderRadius: isMobile? "2vw": "1vw", borderStyle: "ridge", borderStyle: "ridge", borderColor: "#ddd", fontSize: isMobile? "5vw": "2vw", 
          marginLeft: isMobile? "5.7vw": "3.5vw",  paddingLeft: isMobile? "2vw": "1vw", width: isMobile? "60%": "40%"}}
        </textarea>
       </div>
       <div style = {{ display: "flex", width: "80%", marginLeft: "2vw", marginBottom: isMobile? "2vw": "1vw", marginTop: "2vw"}}>
        <div style={{ fontSize: isMobile? "5vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Upload Images:</div>
        <label htmlFor="file-upload" style={{ cursor: "pointer", display: "flex", alignItems: "center", marginLeft: "1vw", marginTop: "0.3vw" }}>
         <BiPaperclip size={isMobile? 24: 32} style={{ marginRight: "0", color: "#555", transform: "rotate(90deg) scaleX(1.2)"}} />
         <input id="file-upload" type="file" name="images" multiple accept="image/*" onChange={handleFiles} style={{ display: "none" }} />
        </label>
        {imageNames.length > 0 && (
        <div>
          <ul>
            {imageNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
        )}
       </div>
       <div style = {{ display: "flex", width: "80%", marginLeft: "2vw", marginBottom: isMobile? "2vw": "1vw", marginTop: "2vw"}}>
        <div style={{ fontSize: isMobile? "5vw": "2vw", display: "flex", alignItems: "center", padding: "0", fontWeight: "500"}}>
         Upload Videos:</div>
        <label htmlFor="file-upload" style={{ cursor: "pointer", display: "flex", alignItems: "center", marginLeft: isMobile? "2vw": "1.5vw", marginTop: "0.3vw" }}>
         <BiPaperclip size={isMobile? 24: 32} style={{ marginRight: "0", color: "#555", transform: "rotate(90deg) scaleX(1.2)"}} />
         <input id="file-upload" type="file" name="images" multiple accept="image/*" onChange={handleFiles} style={{ display: "none" }} />
        </label>
        {imageNames.length > 0 && (
        <div>
          <ul>
            {imageNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
        )}
       </div>
      <div style={{ marginTop: isMobile ? "12vw" : "4vw", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0vw", padding: "0" }}>
          <button style={{backgroundColor: "#B9B8E3", borderRadius: isMobile? "7vw": "5vw", fontSize: isMobile ? "5vw" : "1.5vw", 
          fontWeight: "500", padding: isMobile ? "2vw 10vw" : "0.8vw 5vw", border: "none"
          }} onClick={handleSubmit} type="submit">Add</button>
      </div>
    </Container>
    </div>
  );
};

export default AddPropertyForm;
