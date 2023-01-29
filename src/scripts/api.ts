const BASE_ENDPOINT = "https://restaurant-api.dicoding.dev";
const IMAGE_ENDPOINT = `${BASE_ENDPOINT}/images`;

class RestaurantAPI {
  static async getAll() {
    const response = await fetch(`${BASE_ENDPOINT}/list`, { method: "GET" });
    const result = await response.json();
    return result;
  }

  static async getById(id: string) {
    const response = await fetch(`${BASE_ENDPOINT}/detail/${id}`, { method: "GET" });
    const result = await response.json();
    return result;
  }

  static buildImageURL(imageId: string, config?: { size?: "small" | "medium" | "large" }) {
    const imageSize = config?.size || "small";
    return `${IMAGE_ENDPOINT}/${imageSize}/${imageId}`;
  }
}

export default RestaurantAPI;
