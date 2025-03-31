import { useState } from "react";
import { showConsoleMessage, showConsoleError } from "../util/ConsoleMessage";
import { encrypt, decrypt } from "../util/crypto";
import useStorage from "./useStorage";
import { Endpoint } from "../util/constants";
import { gameData } from "../data/GameData";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { loadData } = useStorage();

  const fetchData = async (config, silent = false) => {
    const { url, method = "GET", headers, body } = config;
    showConsoleMessage("API Request Config:", config)
    const encryptData = encrypt(body);
    const accessToken = await loadData("accessToken");

    const options = {
      method,
      headers: accessToken ? {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
        ...headers,
      } : headers,
      body: JSON.stringify({ data: encryptData }),
      // credentials: 'include', // If I do this I will get a CORS error
    }

    if (!silent) setLoading(true);

    try {
      const res = await fetch(url, options);
      showConsoleMessage("API Response:", res)
      if (res.status === 401 && !options._retry) {
        options._retry = true;
        const refreshToken = loadData('refreshToken');

        const refreshResponse = await fetch(Endpoint.token, {
          method: 'POST',
          body: JSON.stringify({ data: encrypt({ refreshToken: refreshToken }) }),
          // credentials: 'include', // If I do this I will get a CORS error
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          const newAccessToken = data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          options.headers['Authorization'] = `Bearer ${newAccessToken}`;
          res = await fetch(url, options);
        }
      }

      const data = await res.json();

      setResponse(JSON.parse(decrypt(data)));
      setError(null);
      showConsoleMessage("API Response Data:", JSON.parse(decrypt(data)));
    } catch (err) {
      setError(err.message);
      showConsoleError("API Error:", err)
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const login = async (user_id, name, email) => {
    const config = {
      url: Endpoint.login,
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

  const getGames = async (user_id, beta_block_id) => {
    setLoading(true)
    console.log("GetGamesStart")
    setTimeout(() => {
      console.log("GetGames")
      setResponse(gameData);
      setLoading(false);
    }, 1000);
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

    await fetchData(config, true);
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

  const getLeaderBoard = async (limit, page = 1) => {
    const config = {
      url: Endpoint.leader_board,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        limit,
        page
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
    await fetchData(config, true);
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
    await fetchData(config, true);
  };

  const updateCardBalance = async (user_id, card_balance) => {
    const config = {
      url: Endpoint.update_card_balance,
      method: "POST",
      body: {
        user_id: user_id,
        increase_card_balance: card_balance
      },
    };
    await fetchData(config, true);
  };

  const getWinner = async () => {
    const config = {
      url: Endpoint.update_card_balance,
      method: "GET",
    };
    await fetchData(config, true);
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
    updateCardBalance,
    getWinner,
    login,
    getGames
  };
};

export default useApiRequest;
