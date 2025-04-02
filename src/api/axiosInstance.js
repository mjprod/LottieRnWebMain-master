// src/api/axiosInstance.js
import axios from 'axios';
import useStorage from '../hook/useStorage';
import { decrypt, encrypt } from '../util/crypto';

const instance = axios.create({
  baseURL: 'http://localhost:8083/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  async (response) => {
    if (response.data) {
      try {
        response.data = JSON.parse(decrypt(response.data));
      } catch (error) {
        console.error('Error decrypting response:', error);
      }
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      try {
        // Tenta descriptografar a mensagem de erro, se necessário
        if (typeof error.response.data === 'string') {
          error.response.data = JSON.parse(decrypt(error.response.data));
        } else if (error.response.data.error && typeof error.response.data.error === 'string') {
          error.response.data.error = decrypt(error.response.data.error);
        }
      } catch (err) {
        console.error('Erro ao processar o erro:', err);
        // Se falhar, mantém o objeto de erro original
      }
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  async (config) => {
    if (config.data) {
      config.data = JSON.stringify({ data: encrypt(config.data) });
    }
    const { loadData } = useStorage();

    const accessToken = await loadData('accessToken');
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;