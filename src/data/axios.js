import axios from "axios";

const axiosInstance = axios.create({
  baseURL : import.meta.env.VITE_BASE_URL,
  headers : {
    'Content-Type' : 'application/json',
    // in questo caso anche qui Auth 
  }
})

//mette sempre il bearer token ; intercetta tutte le richieste e mette auth
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = import.meta.env.VITE_TOKEN; 
    return config;
  }
)

export default axiosInstance; 