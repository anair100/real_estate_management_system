import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import api from './api';
import home_image from '../resources/home_image.webp';
// import api from '../api/api';

const SearchResult = () => {
  const [properties, setProperties] = useState([]);
  const [searchParams] = useSearchParams();
  console.log("searchParams")

  useEffect(() => {
    console.log('Inside fetchProperties')
    const fetchProperties = async () => {
      try {
        
        console.log('inside fetchProperties')
        const query = searchParams.toString();
        // const response = await fetch(`http://localhost:8080/api/properties/search?${searchParams}`, {
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
          for: 'sell'
        },
        {
          type: 'flate',
          price: '3345',
          phone: '121',
          email: 'abc2',
          description: 'd2',
          location: 'indore',
          googleLocation: 'g2',
          for: 'rent'
        }
        ]);
      }
    };
    fetchProperties();
  }, [searchParams]);

  return (
    <div style = {{backgroundColor: "#F1F2F2"}}>
      <div style = {{backgroundColor: "#F2FCFF", width: "100%", height: "20%"}}>
      <button style={{ backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', 
        padding: '1vw 1vw', borderRadius: "5vw", marginRight: "0"}}>Modify Search</button>
      </div>
      <div style = {{marginLeft: "5vw", fontSize: "2vw", marginTop: "2vw", padding: "0"}}>Showing 2 of 5</div>
      <div style = {{marginLeft: "5vw", fontSize: "3vw", marginTop: "0", padding: "0", borderStyle: "solid", 
        marginRight: "0.5vw", width: "80%"}}>Projects In {searchParams.get("location")}</div>

      <ul style = {{width: "60%", marginTop: "2vw", marginBottom: "1vw", position: "relative", height: "auto", paddingLeft: "0", paddingTop: "0", borderStyle: "solid", display: "block"}}>
       {properties.map((property) => (
        <div style = {{borderStyle: "hidden", borderRadius: "2vw", width: "100%", height: "auto", backgroundColor: "#FAFEFF", 
          display: "flex", marginBottom: "1vw", marginTop: "0", padding: "0"}}>               
         <img style = {{width: "20%"}} src={home_image}/>
         <div style = {{marginBottom: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",
          padding: "0", width: "80%", height: "100%", marginRight: "0vw", backgroundColor: "#FAFEFF"}}>  
          <p class="cgal-info-header-text">
           {property.type}
          </p>
          <p class="cgal-info-desc-text">
           {property.location}
          </p>
          <button style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', marginRight: '10px' }}>Contact</button>
          <button style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>Whatsapp</button>
          </div>
        </div>))}
      </ul>
    </div>
  );
};

export default SearchResult;
