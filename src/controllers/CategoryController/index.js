export default class CategoryController {
  constructor(APIClient) {
    this.client = APIClient;
    this.path = "category";
    this.fields = {
      id: {
        type: "number",
        key: true
      },
      name: {
        type: "string",
      }
    }
  }
  async getData() {
    const data = await this.client.getData(this.path);
    return data
  }
}