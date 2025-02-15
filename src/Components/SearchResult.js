import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import api from './api';
import home_image from '../resources/home_image.webp';
import { Link } from "react-router-dom";

const SearchResult = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [properties, setProperties] = useState([]);
  const [searchParams,setSearchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const[ modifiedSearchParams,setModifiedSearchParams] = useState(paramsObject);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  console.log(' modifiedSearchParams: searchParams:',modifiedSearchParams)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    window.addEventListener("resize", handleResize);
    return () => {
     window.removeEventListener("resize", handleResize);
    };
  },[]);

  useEffect(() => { 
    console.log('Inside fetchProperties: searchParams:',searchParams);
    const fetchProperties = async () => {
      try {
        console.log('inside fetchProperties')
        const query = searchParams.toString();

       //const response = await api.get(`http://localhost:8080/api/properties/search?${searchParams}`);
        const response = await api.get(`/api/properties/search?${searchParams}`);
        console.log(response.data);
        setProperties(response.data);
        console.log(properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([{
          type: 'house',
          price: '121212',
          phone: '121',
          email: 'abc1',
          description: 'desc1',
          location: 'Ind',
          googleLocation: 'g1',
          for: 'sell',
          images: [home_image, home_image]
        },
        {
          type: 'flate',
          price: '3345',
          phone: '121',
          email: 'abc2',
          description: 'd2',
          location: 'indore',
          googleLocation: 'g2',
          for: 'rent',
          images: [home_image]
        }]);
      }
    };
    fetchProperties();
  }, [searchParams]);

  const handlemodify= ()=>{
    console.log('in handlemodify modifiedSearchParams:',modifiedSearchParams);
    setSearchParams(modifiedSearchParams) ;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedSearchParams({ ...modifiedSearchParams, [name]: value });
    console.log('in handleChange modifiedSearchParams: searchParams:',modifiedSearchParams)
  };

  const renderFilterForDesktop = () => {
    return ( <div style = {{backgroundColor: "#F2FCFF", width: "100%", height: "auto",  display: "flex", flexDirection: "row", alignItems: "center", padding: "0.6vw 0.5vw", flexWrap: "wrap"}}>
      <select name="rentOrSell" onChange={handleChange} style={{ marginLeft: "2vw", padding: "0.5vw", borderRadius: "0.5vw", borderStyle: "inset", fontSize: "1.2vw"}}>
       <option value="" disabled selected>
         Looking to
       </option>
       <option value="Sell">Buy</option>
       <option value="Rent">Rent</option>
      </select>
      <select name='type' onChange={handleChange} style={{ marginLeft: "3vw", padding: "0.5vw", borderRadius: "0.5vw", borderStyle: "inset", fontSize: "1.2vw"}}>
       <option value="" disabled selected>
         Type
       </option>
       <option value="House">House</option>
       <option value="Plot">Plot</option>
       <option value="Flat">Flat</option>
       <option value="Land">Land</option>
      </select>
      <input type = "number" style = {{marginLeft: "3vw", fontSize: "1.2vw", padding: "0.5vw", paddingRight: "0.3vw",  borderRadius: "0.5vw", borderStyle: "inset"}} onChange={handleChange} id="priceMin" name="priceMin" placeholder="Min Price (in ₹ Lakhs)"/>
      <input type = "number" style = {{marginLeft: "3vw", fontSize: "1.2vw", padding: "0.5vw", paddingRight: "0.3vw",  borderRadius: "0.5vw", borderStyle: "inset"}} onChange={handleChange} id="priceMax" name="priceMax" placeholder="Max Price (in ₹ Lakhs)"   />
      <button onClick={handlemodify}  style={{ backgroundColor: 'blue', color: 'white', border: 'none',  borderRadius: "0.5vw", 
       padding: '0.5vw 1vw', marginRight: "0", fontSize: isMobile? "4vw": "1.2vw", marginLeft: "auto", marginRight: "2vw"}}>Modify Search</button>
     </div>)
  }

  const renderFilterForMobile = () => {
    return (<div style = {{backgroundColor: "#F2FCFF", width: "100%", height: "auto",  display: "block", flexDirection: "column", alignItems: "center", padding: "3vw 2vw"}}>
     <div style = {{display: "flex", padding: "0"}} >
      <select name="rentOrSell" onChange={handleChange} style={{ borderRadius: "0.5vw", borderStyle: "inset", fontSize: "4vw", marginLeft: "2vw", width: "30%"}}>
       <option value="" disabled selected>
         Looking to
       </option>
       <option value="Sell">Buy</option>
       <option value="Rent">Rent</option>
      </select>
      <select name='type' onChange={handleChange} style={{ marginLeft: "4vw", padding: "0.5vw", borderRadius: "0.5vw", borderStyle: "inset", fontSize: "4vw", width: "20%"}}>
       <option value="" disabled selected>
         Type
       </option>
       <option value="House">House</option>
       <option value="Plot">Plot</option>
       <option value="Flat">Flat</option>
       <option value="Land">Land</option>
      </select>
      <button onClick={handlemodify}  style={{ backgroundColor: 'blue', color: 'white', border: 'none',  borderRadius: "0.5vw", 
       padding: '1vw 1vw', marginRight: "0", fontSize: "4vw", marginLeft: "10vw", width: "30%"}}>Modify Search</button>
     </div>
     <div style = {{display: "flex", padding: "0", marginTop: "2vw"}}>
      <input type = "number" style = {{marginLeft: "2vw", fontSize: "4vw",  borderRadius: "0.5vw", borderStyle: "inset", width: "40%"}} onChange={handleChange} id="priceMin" name="priceMin" placeholder="Min Price (in Lakhs)"/>
      <input type = "number" style = {{marginLeft: "4vw", fontSize: "4vw",  borderRadius: "0.5vw", borderStyle: "inset", width: "40%", marginLeft: "14.5vw"}} onChange={handleChange} id="priceMax" name="priceMax" placeholder="Max Price (in Lakhs)"/>
     </div>
    </div>
     )
  }

  return (
    <div style = {{backgroundColor: "#F1F2F2", minHeight: "100vh"}}>
      {isMobile === true && renderFilterForMobile()}
      {isMobile === false && renderFilterForDesktop()}    
      <div style = {{marginLeft: "5vw", fontSize: "3vw", marginTop: isMobile? "3vw": "2vw", padding: "0", marginRight: "0.5vw", 
        marginBottom: isMobile? "4vw": "1.2vw", width: "80%"}}>
        <h1 style = {{fontSize: isMobile? "4vw": "1.5vw", marginTop: "0", padding: "0", marginBottom: "0vw", textDecoration: "underline"}}>Showing all projects in</h1>
        <h2 style = {{fontSize: isMobile? "6vw":"3vw", marginTop: "0", padding: "0", marginBottom: "2vw", textDecoration: "underline"}}>{searchParams.get("location")}</h2>
      </div>

      <ul style = {{width: isMobile? "90%": "80%", marginLeft: "5vw", position: "relative", height: "auto", padding: "0", display: "block"}}>
       {properties.map((property, index) => (
        <div key={index}  onMouseEnter={() => setHoveredIndex(index)}
         onMouseLeave={() => setHoveredIndex(null)}style = {{borderStyle: "hidden", borderRadius: "5vw", width: "100%", height: "auto",  
          display: "flex", marginBottom: isMobile? "4vw": "2vw", marginTop: "0", padding: "1vw 1vw", border: hoveredIndex === index ? "2px solid #5BB4C5" : "1px solid #ddd"
          , boxShadow: hoveredIndex === index ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none",backgroundColor: "#FAFEFF",
          transform: hoveredIndex === index ? "translateY(-5px)" : "translateY(0)"}}>               
         <div style={{width: "40%", overflow: "hidden", borderRadius: "1vw", display: "flex", alignItems: "center" }}>
          <img style={{
           width: "100%", height: "auto", aspectRatio: "16/16", objectFit: "cover", borderRadius: "1vw"
          }}
          //  src={`http://localhost:8080/api/${property.images[0]}`} alt="Property"
          src={`/${property.images[0]}`} alt="Property"
            />
         </div>
         <div style = {{marginBottom: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",
          padding: "0", height: "100%", marginRight: "0vw", marginLeft: isMobile? "3vw": "2vw",backgroundColor: "#FAFEFF", width: "60%"}}>  
          <Link to={`/showProperty?id=${encodeURIComponent(property._id)}&type=${encodeURIComponent(property.type)}&rentOrSell=${encodeURIComponent(property.rentOrSell)}&location=${encodeURIComponent(property.location)}&size=${encodeURIComponent(property.size)}&price=${encodeURIComponent(property.price)}&images=${encodeURIComponent(property.images?.join(","))}`}
           style = {{fontSize: isMobile? "4vw": "2vw", fontWeight: "700", textDecoration: "underline", padding: "0", marginBottom: "0", color: 'blue'}}>
           {property.type} For {property.rentOrSell} In {property.location}
          </Link>
          <div style = {{fontSize: "2vw", fontWeight: "600", display: "flex", width: isMobile? "100%": "80%", 
            marginTop: "1.5vw", marginLeft: isMobile? "0": "1vw"}}>
           <div style ={{width: isMobile? "45%": "40%", borderRight: "solid"}}>
            <div style = {{fontSize: isMobile? "4vw": "1.5vw", fontWeight: "600"}}>
             Area
            </div>
            <div style = {{fontSize: isMobile? "4vw": "1.5vw", fontWeight: "600"}}>
             {property.size>=43560? `${(property.size/43560).toFixed(0)} Acre`: property.size>=12000? `${(property.size/12000).toFixed(0)} Bigha`: `${(property.size)} SqFt.`}
            </div>
           </div>
           <div style ={{width: isMobile? "55%": "40%", marginLeft: "2vw"}}>
            <div style = {{fontSize: isMobile? "4vw": "1.5vw", fontWeight: "600"}}>
             Price
            </div>
            <div style = {{fontSize: isMobile? "4vw": "1.5vw", fontWeight: "600"}}>
             Rs. {property.price>=10000000? `${(property.price/10000000).toFixed(1)} Cr`: property.price>=100000? `${(property.price/100000).toFixed(1)} Lac`: `${(property.price/1000).toFixed(1)} Th`}
            </div>
           </div>
          </div>
          <div style = {{ display: "flex", maxWidth: "100%", marginTop: isMobile? "5vw": "3vw",
            marginBottom: isMobile? "2vw": "0.5vw", width: "80%", marginLeft: isMobile? "0": "1vw"}}>
           <a style = {{padding: "1vw 2vw", backgroundColor: "red", color: "#fff", textDecoration: "none",
            fontFamily: "sans-serif", fontSize: isMobile? "4vw": "1.5vw", marginRight: "0vw", borderRadius: "1vw"}} href="tel:9981069233">Contact</a>
           <a style = {{padding: "1vw 2vw", backgroundColor: "#25D366", color: "#fff", textDecoration: "none", 
           fontFamily: "sans-serif", fontSize: isMobile? "4vw": "1.5vw", float: "right", marginLeft: isMobile? "6vw": "7vw", borderRadius: '1vw'}} href="https://api.whatsapp.com/send?phone=9981069233">
            WhatsApp
           </a>
          </div> 
         </div>
        </div>))}
      </ul>
    </div>
  );
};

export default SearchResult;
