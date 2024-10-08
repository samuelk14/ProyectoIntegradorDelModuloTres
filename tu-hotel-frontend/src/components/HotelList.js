import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem('token');  // Obtener el token desde localStorage
      const response = await axios.get('http://localhost:5000/api/hotels', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotels(response.data);
    };

    fetchHotels();
  }, []);

  return (
    <div>
      <h1>Lista de Hoteles</h1>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            <Link to={`/hotels/${hotel.id}`}>{hotel.name}</Link>
            <Link to={`/hotels/${hotel.id}/reserve`}>Reservar</Link>  
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
