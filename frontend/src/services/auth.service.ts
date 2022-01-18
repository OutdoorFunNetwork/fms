import axios, { AxiosResponse } from 'axios';
import api from './api.service';

const API_PREFIX = process.env.REACT_APP_API_PREFIX;

class AuthService {
  async login(email: string, password: string) {
    return await axios.post(`${API_PREFIX}/auth/login`, {
      email,
      password,
    }, {
      withCredentials: true
    });
  }

  async me(): Promise<AxiosResponse> {
    return await api.get(`${API_PREFIX}/auth/me`, {
      withCredentials: true,
    });
  }

  async logout() {
    return await axios.delete(`${API_PREFIX}/auth/logout`, { withCredentials: true });
  }
}

export default new AuthService();