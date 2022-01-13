import axios from 'axios';

const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX;

type LoginRes = {
  accessToken: string;
  refreshToken: string;
};

class AuthService {
  async login(email: string, password: string)  {
    const { data } = await axios.post<LoginRes>(`${API_PREFIX}/auth/login`, {
      email,
      password,
    }, {
      withCredentials: true
    });
    const { accessToken, refreshToken } = data;

    return {
      accessToken,
      refreshToken,
    }
  }

  async logout() {
    return await axios.delete(`${API_PREFIX}/auth/logout`, { withCredentials: true });
  }
}

export default new AuthService();