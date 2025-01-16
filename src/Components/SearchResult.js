import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import api from './api';
import home_image from '../resources/home_image.webp';
// import api from '../api/api';

const SearchResult = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [properties, setProperties] = useState([]);
  const [searchParams,setSearchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const[ modifiedSearchParams,setModifiedSearchParams] = useState(paramsObject);
  console.log(' modifiedSearchParams: searchParams:',modifiedSearchParams)

  useEffect(() => {
    console.log('Inside fetchProperties: searchParams:',searchParams);
    const fetchProperties = async () => {
      try {
        console.log('inside fetchProperties')
        const query = searchParams.toString();
        //const response = await fetch(`http://localhost:8080/api/properties/search?${searchParams}`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        const response = await api.get(`http://localhost:8080/api/properties/search?${searchParams}`);
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
        }
        ]);
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

  return (
    <div style = {{backgroundColor: "#F1F2F2"}}>
      <div style = {{backgroundColor: "#F2FCFF", width: "100%", height: "auto",  display: "flex", flexDirection: "row", alignItems: "center", padding: "0.5vw 0.5vw"}}>
       <select name="rentOrSell" onChange={handleChange} style={{ marginLeft: "1vw", padding: "0.5vw", borderRadius: "0.5vw", borderStyle: "inset", fontSize: "1.5vw"}}>
        <option value="" disabled selected>
          Looking to
        </option>
        <option value="Sell">Buy</option>
        <option value="Rent">Rent</option>
       </select>
       <select name='type' onChange={handleChange} style={{ marginLeft: "1.5vw", padding: "0.5vw", borderRadius: "0.5vw", borderStyle: "inset", fontSize: "1.5vw"}}>

        <option value="" disabled selected>
          Property Type
        </option>
        <option value="House">House</option>
        <option value="Plot">Plot</option>
        <option value="Plot">Flat</option>
        <option value="Land">Land</option>
       </select>
       
       <button onClick={handlemodify}  style={{ backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', 
        padding: '1vw 1vw', borderRadius: "5vw", marginRight: "0", fontSize: "1.5vw", float: "right"}}>Modify Search</button>
      </div>

      <div style = {{marginLeft: "17vw", fontSize: "3vw", marginTop: "2vw", padding: "0", marginRight: "0.5vw", 
        marginBottom: "1.2vw", width: "80%"}}>
        <h1 style = {{fontSize: "1.5vw", marginTop: "0", padding: "0", marginBottom: "0vw"}}>Showing projects in</h1>
        <h2 style = {{fontSize: "3vw", marginTop: "0", padding: "0", marginBottom: "2vw"}}>{searchParams.get("location")}</h2>
      </div>

      <ul style = {{width: "65%", margin: "auto", position: "relative", height: "auto", padding: "0", display: "block"}}>
       {properties.map((property) => (
        <div style = {{borderStyle: "hidden", borderRadius: "2vw", width: "100%", height: "auto", backgroundColor: "#FAFEFF", 
          display: "flex", marginBottom: "2vw", marginTop: "0", padding: "1vw 1vw"}}>               
         <img style = {{width: "40%", marginRight: "0"}} src={`http://localhost:8080/${property.images[0]}`} alt={`Property`}/>
         <div style = {{marginBottom: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",
          padding: "0", height: "100%", marginRight: "0vw", marginLeft: "2vw",backgroundColor: "#FAFEFF", width: "60%"}}>  
          <div style = {{fontSize: "2vw", fontWeight: "700", textDecoration: "underline", padding: "0"}}>
           {property.size} {property.type} For {property.rentOrSell} In {property.location}
          </div>
          <div style = {{fontSize: "2vw", fontWeight: "600", display: "flex", width: "50%", borderStyle: "solid", margin: "auto",
            justifyContent: "space-between"
          }}>
           <div style = {{fontSize: "2vw", fontWeight: "600"}}>
             Area
           </div>
           <div style = {{fontSize: "2vw", fontWeight: "600"}}>
             Price
           </div>
          </div>
          <div style = {{ display: "flex", maxWidth: "100%", margin: "auto", marginTop: "0.5vw",
            marginBottom: "0.5vw", width: "70%", justifyContent: "space-between"}}>
           <a style = {{padding: "1vw", backgroundColor: "red", color: "#fff", textDecoration: "none",
            fontFamily: "sans-serif", fontSize: "1.5vw", marginRight: "5vw"}} href="tel:9981069233">Contact</a>
           <a style = {{padding: "1vw", backgroundColor: "#25D366", color: "#fff", textDecoration: "none", 
           fontFamily: "sans-serif", fontSize: "1.5vw", float: "right", marginLeft: "3vw"}} href="https://api.whatsapp.com/send?phone=9981069233">
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
