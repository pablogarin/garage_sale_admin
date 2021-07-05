export default class CategoryController {
  constructor(APIClient) {
    this.client = APIClient;
    this.path = "category";
    this.fields = {
      name: {
        type: "string",
        label: 'Name'
      }
    }
  }
  async getData(id = null) {
    if (id) {
      const data = await this.client.getData(`${this.path}/${id}`);
      return data;
    } else {
      const data = await this.client.getData(this.path);
      return data
    }
  }

  getCreateURL(id) {
    return `/admin/category/create`;
  }

  getEditURL(id) {
    return `/admin/category/${id}`;
  }

  async update(id, data) {
    const requestData = {
      name: data.name,
    }
    const response = await this.client.updateData(`/category/${id}`, requestData);
    return response;
  }

  async create(data) {
    const requestData = {
      name: data.name,
    }
    const response = await this.client.saveData(`/category`, requestData);
    return response;
  }

  getValue(key, value) {
    const field = this.fields[key];
    switch(field.type) {
      case 'string':
        return value;
      case 'number':
        if (/\d+\.\d+/gi.test(value)) {
          return parseFloat(value);
        }
        return parseInt(value);
      default:
        return value;
    }
  }
}