import { Endpoint } from '../util/constants';
import axiosInstance from './axiosInstance';

export const loginAPI = async ({ user_id, name, email }) => {
  const response = await axiosInstance.post(Endpoint.login, { user_id, name, email });
  return response.data;
};

export const fetchUserDetailsAPI = async ({ user_id, name, email }) => {
  const response = await axiosInstance.post(Endpoint.fetch_user_details, {
    user_id,
    name,
    email,
  });
  return response.data;
};

export const getGamesAPI = async ({ user_id, beta_block_id }) => {
  const response = await axiosInstance.post(Endpoint.games, { user_id, beta_block_id });
  return response.data;
};