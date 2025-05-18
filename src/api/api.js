import { Endpoint } from '../util/constants';
import axiosInstance from './axiosInstance';

export const loginAPI = async({ user_id, name, email }) => {
  const response = await axiosInstance.post(Endpoint.login, { user_id, name, email });
  return response.data;
};

export const fetchUserDetailsAPI = async({ user_id, name, email }) => {
  const response = await axiosInstance.post(Endpoint.fetch_user_details, {
    user_id,
    name,
    email,
  });
  return response.data;
};

export const getWinnerAPI = async() => {
  const response = await axiosInstance.get(Endpoint.winners);
  return response.data;
};

export const getDailyQuestionAPI = async({ user_id, beta_block_id }) => {
  const response = await axiosInstance.post(Endpoint.get_daily_question, { user_id, beta_block_id });
  return response.data;
};

export const postDailyAnswerAPI = async({ user_id, question_id, answer, cards_won, beta_block_id }) => {
  const response = await axiosInstance.post(Endpoint.post_daily_answer, {
    user_id,
    question_id,
    answer,
    cards_won,
    beta_block_id,
  });
  return response.data;
};

export const getGamesAPI = async({ user_id, beta_block_id }) => {
  const response = await axiosInstance.post(Endpoint.games, { user_id, beta_block_id });
  return response.data;
};

export const updateCardPlayedAPI = async({ beta_block_id, user_id, game_id }) => {
  const response = await axiosInstance.post(Endpoint.update_card_played, {
    beta_block_id,
    user_id,
    game_id,
  });
  return response.data;
};

export const updateScoreAPI = async({ user_id, score, game_id, combo_played }) => {
  const response = await axiosInstance.post(Endpoint.update_score, {
    user_id,
    score,
    game_id,
    combo_played,
  });
  return response.data;
};

export const updateLuckySymbolAPI = async({ user_id, lucky_symbol }) => {
  const response = await axiosInstance.post(Endpoint.update_lucky_symbol, { user_id, lucky_symbol });
  return response.data;
};

export const updateCardBalanceAPI = async({ user_id, beta_block_id, card_balance }) => {
  const response = await axiosInstance.post(Endpoint.update_card_balance, {
    user_id,
    beta_block_id,
    increase_card_balance: card_balance,
  });
  return response.data;
};

export const getLeaderBoardAPI = async({ beta_block_id, limit, page }) => {
  const response = await axiosInstance.post(Endpoint.leader_board, { beta_block_id, limit, page });
  return response.data;
};