import axios from "axios";
const DEFAULT_ERROR_MESSAGE = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

function handleValidationError(error) {
  const message = error.response.data.errors
                                    .map((e) => e.msg)
                                    .reduce((s1, s2) => {
                                      return `${s1}\n${s2}`;
                                    }, '');
  alert(message);
}

function handleUnauthorized(error) {
  if (error.config.url.search('login') < 0) {
  }

}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
});

api.interceptors.request.use((config) => {
  const token = localStorage.token;
  if (token) 
    config.headers.Authorization = 'Bearer ' + token;
  return config;
});

api.interceptors.response.use(null, 
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch(error.response.status) {
        case 400:
          handleValidationError(error);
          break;
        case 401:
          handleUnauthorized(error);
          break;
        default:
          console.log(error.request);
          alert(DEFAULT_ERROR_MESSAGE);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      alert(DEFAULT_ERROR_MESSAGE);
    } else {
      // Something happened in setting up the request that triggered an Error
      alert(DEFAULT_ERROR_MESSAGE);
    }
    return Promise.reject(error);
  }
);

export default api;
