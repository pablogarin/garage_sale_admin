export default class ProductController {
  constructor(APIClient) {
    this.client = APIClient;
    this.path = "product";
    this.fields = {
      name: {
        type: "string",
        label: "Name"
      },
      category: {
        type: "select",
        label: "Category",
        options: [
          {
            value: 1,
            label: "Muebles"
          },
          {
            value: 2,
            label: "Electrodomesticos"
          },
          {
            value: 3,
            label: "Dormitorio"
          },
          {
            value: 4,
            label: "Jardín"
          },
          {
            value: 5,
            label: "Decoración"
          },
          {
            value: 6,
            label: "Vehículos"
          }
        ]
      },
      price: {
        type: "number",
        label: "Price"
      },
      images: {
        type: "multifile",
        label: "Gallery"
      },
      description: {
        type: "string",
        label: "Description"
      },
      availableDate: {
        type: "date",
        label: "Available Date"
      },
      stock: {
        type: "number",
        label: "Stock"
      }
    }
  }
  async getData(id = null) {
    if (id) {
      const data = await this.client.getData(`${this.path}/${id}?category=1`);
      return data;
    } else {
      const data = await this.client.getData(this.path);
      return data
    }
  }

  getCreateURL(id) {
    return `/admin/product/create`;
  }

  getEditURL(id) {
    return `/admin/product/${id}`;
  }

  async update(id, data) {
    const requestData = {
      name: data.name,
      price: data.price,
      images: data.images,
      description: data.description,
      available_date: data.availableDate,
      category_id: data.category,
      stock: data.stock
    }
    const response = await this.client.updateData(`/product/${id}`, requestData);
    return response;
  }

  async create(data) {
    const requestData = {
      name: data.name,
      price: data.price,
      images: data.images,
      description: data.description,
      available_date: data.availableDate,
      category_id: data.category,
      stock: data.stock
    }
    const response = await this.client.saveData(`/product`, requestData);
    return response;
  }

  getValue(key, value) {
    console.log(value);
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