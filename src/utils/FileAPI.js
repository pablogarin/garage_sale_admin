import axios from 'axios';

export default class FileAPI {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.instance = axios.create({
      baseURL: this.baseUrl,
      timeout: 30*1000,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  async upload(files) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append(file.name, file)
    });
    const response = await this.instance.request({
      url: '/files',
      method: 'POST',
      data: formData
    })
    if (response.status === 200) {
      return response.data.files;
    }
    console.error(response);
  }
}