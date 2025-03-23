import { useState } from "react";
import { SERVER, API_KEY, Endpoint } from "../util/constants";
import { showConsoleMessage, showConsoleError } from "../util/ConsoleMessage";
import { encrypt, decrypt } from "../util/crypto";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = async (config) => {
    const { url, method = "GET", headers, body } = config;
    showConsoleMessage("API Request Config:", config)
    console.log("Body", JSON.stringify(body))
    const encryptData = encrypt(body);

    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers: { ...headers, "x-api-key": API_KEY },
        body: JSON.stringify({ data: encryptData}),
      });
      showConsoleMessage("API Response:", res)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setResponse(JSON.parse(decrypt(data)));

      setError(null);
      showConsoleMessage("API Response Data:", JSON.parse(decrypt(data)));
    } catch (err) {
      setError(err.message);
      showConsoleError("API Error:", err)
    } finally {
      setLoading(false);
    }
  };

  const silentFetchData = async (config) => {
    const { url, method = "GET", headers, body } = config;
    showConsoleMessage("Silent API Request Config:", config)
    const encryptData = encrypt(JSON.stringify(body));

    try {
      const res = await fetch(url, {
        method,
        headers: { ...headers, "x-api-key": API_KEY },
        body: JSON.stringify({ data: encryptData}),
      });
      showConsoleMessage("Silent API Response:", res)
      if (!res.ok) {
        throw new Error(`Silent HTTP error! status: ${JSON.stringify(res)}`);
      }
      const data = await res.json();

      setResponse(decrypt(data).json());

      showConsoleMessage("Silent API Response Data:", decrypt(data))
    } catch (err) {
      showConsoleError("Silent API Error:", err)
    } finally {
    }
  };

  const updateLuckySymbol = async (user_id, lucky_symbol) => {
    const config = {
      url: Endpoint.update_lucky_symbol,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user_id,
        lucky_symbol,
      },
    };

    await silentFetchData(config);
  };

  const fetchUserDetails = async (user_id, name, email) => {
    const config = {
      url: Endpoint.fetch_user_details,
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
      url: Endpoint.get_daily_question,
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
      url: Endpoint.post_daily_answer,
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
      url: Endpoint.leader_board,
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

  const updateCardPlayed = async (beta_block_id, user_id, lucky_symbol_won, number_combination_total) => {
    const config = {
      url: Endpoint.update_card_played,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        beta_block_id,
        user_id,
        lucky_symbol_won,
        number_combination_total
      },
    };
    await silentFetchData(config);
  };

  const updateScore = async (user_id, score, game_id, combo_played) => {
    const config = {
      url: Endpoint.update_score,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user_id,
        score,
        game_id,
        combo_played
      },
    };
    await silentFetchData(config);
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
    getLeaderBoard,
    updateCardPlayed,
    updateScore,
  };
};

export default useApiRequest;
