import axios from 'axios';

export default class LoginClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async login(user, pass) {
    const response = await axios.request({
      url: `${this.baseUrl}/authenticate`,
      method: 'POST',
      data: {
        user,
        passwd: pass
      }
    });
    if (response.status === 200) {
      return response.data.token;
    }
    throw new Error("Invaid credentials");
  }

  async validate(token) {
    const response = await axios.request({
      url: `${this.baseUrl}/validate-token`,
      method: 'POST',
      data: {
        token
      }
    });
    if (response.status === 200) {
      return response.data.valid;
    }
    throw new Error("Invaid credentials");
  }
}
