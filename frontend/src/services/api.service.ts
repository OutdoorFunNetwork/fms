import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_PREFIX,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const { config } = err;

    if (config.url !== '/auth/login' && config.url !== '/auth/token' && err.response) {
      if (err.response.status === 403) {
        try {
          await instance.post('/auth/token', {}, { withCredentials: true });

          return instance(config);
        } catch (e: any) {
          throw new Error(e);
        }
      }
    }

    return Promise.reject(err);
  },
);

export default instance;
