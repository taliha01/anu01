'use client'; 
import { useState, useEffect } from 'react'; 
import './craete-brand.css';

export default function CreateBrandPage() {
  const [brands, setBrands] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = () => {
      const savedToken = localStorage.getItem('authToken');
      if (savedToken) {
        setToken(savedToken);
        console.log('Token retrieved:', savedToken);
      } else {
        console.log('No token found in localStorage');
      }
    };

    fetchToken();
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const csrfToken = 'CfDJ8FI7T0DLPxVCkSC1KPf5pCaRzryMGokuA4BJr6DsHkPrnAUkl7fG5v0pO8AICYkyz12xSunrnZjE65uxMorNe2RJTrsowJjw0edENS5ASJcFwrKKWpVYILmvMyLlRHnpc42GZlriUvt-gADwZkyStrA'; // Replace with actual CSRF token

    try {
      const response = await fetch('https://careapi.beckcrm.dk/api/services/app/Brand/GetAll', {
        method: 'GET',
        headers: {
          'accept': 'text/plain',
          'Authorization': token ? `Bearer ${token}` : 'null', 
          'X-XSRF-TOKEN': csrfToken,
        },
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        setBrands(data);
        setResponseMessage('Brands fetched successfully!');
      } else {
        setResponseMessage(`Error: ${data.message || 'Failed to fetch brands'}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="create-brand-container">
      <h2>Brand List</h2>
      <div className="response-message">
        {responseMessage && <p>{responseMessage}</p>}
      </div>

      {brands.length > 0 ? (
        <ul>
          {brands.map((brand) => (
            <li key={brand.id}>{brand.name}</li>
          ))}
        </ul>
      ) : (
        <p>No brands available.</p>
      )}

      {token && <p>Token: {token}</p>}
    </div>
  );
}
