import { useState } from 'react';
import { SERVER } from '../util/constants';

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
      url: SERVER + '/updateLuckySymbol',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id,
        lucky_symbol,
      },
    };

    await fetchData(config);
  };

  const fetchUserDetails = async () => {
    const config = {
      url: SERVER + "/user_details",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user_id: 1, // Dynamically set user ID here
        utc_date: "2025-02-15T00:00:00Z"
      },
    };

    await fetchData(config); // Trigger the API call
  };

  return { loading, error, response, fetchData, updateLuckySymbol, fetchUserDetails };
};



export default useApiRequest;

