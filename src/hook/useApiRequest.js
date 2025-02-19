import { useState } from 'react';
import { SERVER } from '../util/constants';

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = async (config) => {
    const { url, method = 'GET', headers, body } = config;

    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
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

  const fetchUserDetails = async (user_id, name, email) => {
    const config = {
      url: SERVER + "/users",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user_id,
        name,
        email
      },
    };

    await fetchData(config);
  };

  const getDailyQuestion = async (user_id) => {
    const config = {
      url: SERVER + "/daily_question",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user_id,
      },
    };

    await fetchData(config);
  }

  return { loading, error, response, fetchData, updateLuckySymbol, fetchUserDetails, getDailyQuestion };
};



export default useApiRequest;

