import axios from "axios";
import getHeader from "./config";
import router from './router/index'

const axiosInstance = axios.create({
  headers: {
    Accept: getHeader().Accept,
    Authorization: getHeader().Authorization,
  },
});

// logout if unauthorized user
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      router.push('/login');
    }
    return error;
  }
);

export default axiosInstance;
