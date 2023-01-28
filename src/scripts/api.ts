const BASE_ENDPOINT = "https://restaurant-api.dicoding.dev";

class RestaurantAPI {
  static async getAll() {
    const response = await fetch(`${BASE_ENDPOINT}/list`, { method: "GET" });
    const result = await response.json();
    return result;
  }
}

export default RestaurantAPI;
