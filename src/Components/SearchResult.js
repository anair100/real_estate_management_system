import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
// import api from '../api/api';

const SearchResult = () => {
  const [properties, setProperties] = useState([]);
  const [searchParams] = useSearchParams();
  console.log("searchParams")
  console.log(searchParams.get("location"))

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const query = searchParams.toString();
        // const response = await api.get(`/properties?${query}`);
        // setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, [searchParams]);

  return (
    <div>

    <h3>{searchParams.get("location")}</h3>
    <h3>{searchParams.get("priceMin")}</h3>
    <h3>{searchParams.get("priceMax")}</h3>
    <h3>{searchParams.get("size")}</h3>
    <h3>{searchParams.get("type")}</h3>
    <h3>{searchParams.get("rentOrSell")}</h3>


      {properties.length ? (
        properties.map((property) => (
          <div key={property._id}>
            <h3>{property.type}</h3>
            <p>{property.location}</p>
            <p>${property.price}</p>
            <img src={`http://localhost:5000/${property.images[0]}`} alt={property.type} style={{ width: '100px', height: '100px' }} />
          </div>
        ))
      ) : (
        <p>No properties found</p>
      )}
    </div>
  );
};

export default SearchResult;
