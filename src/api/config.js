import axios from "axios";
import { getToken } from "../utils/securestore.utils";

const axiosConn = axios.create({
  baseURL: "https://habithobbit-server.onrender.com",
});

export default axiosConn;

// Request interceptor (Outgoing)
axiosConn.interceptors.request.use(
  async (config) => {
    //Do something before request is sent
    let token = await getToken();
    token = JSON.parse(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
