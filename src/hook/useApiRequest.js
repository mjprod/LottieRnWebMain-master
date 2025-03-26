import { useState } from "react";
import { showConsoleMessage, showConsoleError } from "../util/ConsoleMessage";
import { encrypt, decrypt } from "../util/crypto";
import useStorage from "./useStorage";
import { Endpoint } from "../util/constants";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { saveData, loadData } = useStorage();

  const fetchData = async (config, silent = false) => {
    const { url, method = "GET", headers, body } = config;
    showConsoleMessage("API Request Config:", config)
    const encryptData = encrypt(body);
    loadData("token").then((token) => {
      try {
        if (!silent) setLoading(true);
        fetch(url, {
          method,
          headers: token ? { ...headers, "Authorization": "Bearer " + token } : headers,
          body: JSON.stringify({ data: encryptData }),
        }).then((res) => {
          showConsoleMessage("API Response:", res)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          res.json().then((data) => {
            setResponse(JSON.parse(decrypt(data)));

            setError(null);
            showConsoleMessage("API Response Data:", JSON.parse(decrypt(data)));
          });
        });
      } catch (err) {
        setError(err.message);
        showConsoleError("API Error:", err)
      } finally {
        if (!silent) setLoading(false);
      }
    });

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

    await fetchData(config).then(() => {
      if (response != null && response.token)
        saveData("token", response.token)
    });
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
