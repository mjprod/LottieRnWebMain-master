import { useState } from "react";
import { SERVER } from "../util/constants";
import { showConsoleMessage, showConsoleError } from "../util/ConsoleMessage";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = async (config) => {
    const { url, method = "GET", headers, body } = config;
    showConsoleMessage("API Request Config:", config)
    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
      showConsoleMessage("API Response:", res)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
      showConsoleMessage("API Response Data:", data)
    } catch (err) {
      setError(err.message);
      showConsoleError("API Error:", err)
    } finally {
      setLoading(false);
    }
  };

  const updateLuckySymbol = async (id, lucky_symbol) => {
    const config = {
      url: SERVER + "/updateLuckySymbol",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        email,
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
  };

  const postDailyAnswer = async (user_id, question_id, answer, cards_won) => {
    const config = {
      url: SERVER + "/daily_answer",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user_id,
        question_id,
        answer,
        cards_won
      },
    };
    await fetchData(config);
  };

  const getLeaderBoard = async (limit) => {
    const config = {
      url: SERVER + "/leader_board",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        limit,
      },
    };
    await fetchData(config);
  };

  return {
    loading,
    error,
    response,
    fetchData,
    updateLuckySymbol,
    fetchUserDetails,
    getDailyQuestion,
    postDailyAnswer,
    getLeaderBoard
  };
};

export default useApiRequest;
