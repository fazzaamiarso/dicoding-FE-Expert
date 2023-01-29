import { z } from "zod";

const BASE_ENDPOINT = "https://restaurant-api.dicoding.dev";
const IMAGE_ENDPOINT = `${BASE_ENDPOINT}/images`;

const restaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  pictureId: z.string(),
  city: z.string(),
  rating: z.number(),
});

const apiResponseSchema = z.object({
  error: z.boolean(),
  message: z.string(),
});

class RestaurantAPI {
  static async getAll() {
    const response = await fetch(`${BASE_ENDPOINT}/list`, { method: "GET" });
    const result = await response.json();

    const resultSchema = apiResponseSchema.extend({ restaurants: z.array(restaurantSchema) });
    const parsedResult = resultSchema.safeParse(result);
    if (parsedResult.success) {
      return { error: false, data: parsedResult.data.restaurants };
    }
    return { error: true, message: "It's an error. FIX it ASAP!" };
  }

  static async getById(id: string) {
    const response = await fetch(`${BASE_ENDPOINT}/detail/${id}`, { method: "GET" });
    const result = await response.json();

    const resultSchema = apiResponseSchema.extend({ restaurant: restaurantSchema });
    const parsedResult = resultSchema.safeParse(result);
    if (parsedResult.success) {
      return { error: false, data: parsedResult.data.restaurant };
    }
    return { error: true, message: "It's an error. FIX it ASAP!" };
  }

  static buildImageURL(imageId: string, config?: { size?: "small" | "medium" | "large" }) {
    const imageSize = config?.size || "small";
    return `${IMAGE_ENDPOINT}/${imageSize}/${imageId}`;
  }
}

export default RestaurantAPI;
