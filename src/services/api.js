import axios from 'axios';
import ApiError from 'util/apiError';

class Api {

  apiUrl = process.env.REACT_APP_API_URL;

  getConfig = (params = null) => {
    const jwtToken = localStorage.getItem('jwtToken');

    const config = {};

    if (jwtToken) {
      Object.assign(config, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    }

    if (params) {
      Object.assign(config, {
        params,
      });
    }

    return config;
  }

  post = (url, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`${this.apiUrl}${url}`, body, this.getConfig());

        resolve(data);
      } catch (error) {
        new ApiError(error);
        // Auth.verifyApiError(error);
        reject(error);
      }
    });
  }

  put = (url, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.put(`${this.apiUrl}${url}`, body, this.getConfig());

        resolve(data);
      } catch (error) {
        new ApiError(error);
        // Auth.verifyApiError(error);
        reject(error);
      }
    });
  }

  delete = url => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.delete(`${this.apiUrl}${url}`, this.getConfig());

        resolve(data);
      } catch (error) {
        new ApiError(error);
        // Auth.verifyApiError(error);
        reject(error);
      }
    });
  }

  get = (url, query = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`${this.apiUrl}${url}`, this.getConfig(query));

        resolve(data);
      } catch (error) {
        new ApiError(error);
        // Auth.verifyApiError(error);
        reject(error);
      }
    });
  }
}

export default new Api();
