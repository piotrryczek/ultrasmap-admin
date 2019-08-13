import axios from 'axios';
import { reject } from 'q';

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
        const { data: { data } } = await axios.post(`${this.apiUrl}${url}`, body, this.getConfig());

        resolve(data);
      } catch (error) {
        reject(error);
      }
    })
  }

  put = (url, body) => {
    return axios.put(`${this.apiUrl}${url}`, body, this.getConfig());
  }

  delete = url => {
    return axios.delete(`${this.apiUrl}${url}`, this.getConfig());
  }

  get = (url, query) => {
    return axios.delete(`${this.apiUrl}${url}`, this.getConfig(query));
  }
}

export default new Api();
