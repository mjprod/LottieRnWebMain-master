import { useState } from 'react';

// Custom hook for making API requests using fetch
const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = async (config) => {
    const { url, method = 'GET', headers, body } = config;

    try {
      setLoading(true);

      // Make the fetch request
      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null, // If body exists, stringify it
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
      console.log(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    // Function specifically for updating lucky symbol
    const updateLuckySymbol = async (id, lucky_symbol) => {
        const config = {
          url: 'http://3.27.254.35:3001/updateLuckySymbol', // Replace with your API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            id,
            lucky_symbol, // Pass the updated lucky symbol value
          },
        };
    
        await fetchData(config); // Use the generic fetchData function to make the API call
      };

  return { loading, error, response, fetchData , updateLuckySymbol};
};



export default useApiRequest;

