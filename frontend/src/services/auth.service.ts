import axios, { AxiosResponse } from 'axios';
import api from './api.service';

class AuthService {
  api_prefix = process.env.REACT_APP_API_PREFIX;

  login(email: string, password: string) {
    return axios.post(`${this.api_prefix}/auth/login`, {
      email,
      password,
    }, {
      withCredentials: true,
    });
  }

  me(): Promise<AxiosResponse> {
    return api.get(`${this.api_prefix}/auth/me`, {
      withCredentials: true,
    });
  }

  logout() {
    return axios.delete(`${this.api_prefix}/auth/logout`, { withCredentials: true });
  }
}

export default new AuthService();
