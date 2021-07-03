import axios from 'axios';

export default class APIClient {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 30*1000,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  async getData(path) {
    const response = await this.axiosInstance.request({
      method: 'GET',
      url: path
    });
    if (response.status >= 200 && response.status < 400) {
      return response.data;
    }
    throw new Error(`Unable to complete request: ${response}`);
  }

  async saveData(path, data) {
    const response = await this.axiosInstance.request({
      method: 'POST',
      url: path,
      data
    });
    if (response.status >= 200 && response.status < 400) {
      return response.data;
    }
    throw new Error(`Unable to complete request: ${response}`);
  }

  async updateData(path, data) {
    const response = await this.axiosInstance.request({
      method: 'PUT',
      url: path,
      data
    });
    if (response.status >= 200 && response.status < 400) {
      return response.data;
    }
    throw new Error(`Unable to complete request: ${response}`);
  }
}