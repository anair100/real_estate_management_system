import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
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
        const response = await fetch(`http://localhost:8080/search?${searchParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(await response.body);

        // const response = await api.get(`/properties?${query}`);
        const data = await response.json();
         setProperties(data);
      
        console.log(properties);

      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties(  [{
          type: 'house',
          price: '121212',
          phone: '121',
          email: 'abc1',
          description: 'desc1',
          location: 'Ind',
          googleLocation: 'g1',
          for:'sell'
        
        },
        {
          type: 'flate',
          price: '3345',
          phone: '121',
          email: 'abc2',
          description: 'd2',
          location: 'indore',
          googleLocation: 'g2',
          for:'rent'
        }
      ]);
      }
    };
    fetchProperties();
  }, [searchParams]);

  return (
    <div>
      <h4>{searchParams.get("location")},
        {searchParams.get("priceMin")},
        {searchParams.get("priceMax")},
        {searchParams.get("size")},
        {searchParams.get("type")},
        {searchParams.get("rentOrSell")}</h4>


      {properties.length ? (
        properties.map((property) => (
          <div key={property._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '10px', display: 'flex', gap: '15px' }}>
            <div>
              <h3>{property.type} for {property.for}</h3>
              <p>Area: {property.size} Sq. ft.</p>
              <p>Price: ₹ {property.price}</p>
              <p>{property.location}</p>
              <p>{property.description}</p>
              <p>{property.price}</p>
              <p>{property.email}</p>
              <p>{property.phone}</p>
              <button style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', marginRight: '10px' }}>Contact</button>
              <button style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>Whatsapp</button>
            </div>


            {/* <img src={`http://localhost:5000/${property.images[0]}`} alt={property.type} style={{ width: '100px', height: '100px' }} /> */}
          </div>

        ))
      ) : (
        <p>No properties found</p>
      )}
    </div>
  );
};

export default SearchResult;
