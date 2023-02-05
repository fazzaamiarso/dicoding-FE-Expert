import { z } from "zod";
import { restaurantAPIConfig } from "./constants";
import {
  apiResponseSchema,
  restaurantSchema,
  restaurantDetailSchema,
} from "@/types/restaurant-api";

const { BASE_URL, IMAGE_URL } = restaurantAPIConfig;

class RestaurantAPI {
  static async getAll() {
    const response = await fetch(`${BASE_URL}/list`, { method: "GET" });
    const result = await response.json();

    const resultSchema = apiResponseSchema.extend({ restaurants: z.array(restaurantSchema) });
    const parsedResult = resultSchema.safeParse(result);
    if (!parsedResult.success) throw Error("It's an error. FIX it ASAP!");
    return parsedResult.data.restaurants;
  }

  static async getById(id: string) {
    const response = await fetch(`${BASE_URL}/detail/${id}`, { method: "GET" });
    const result = await response.json();

    const resultSchema = apiResponseSchema.extend({ restaurant: restaurantDetailSchema });
    const parsedResult = resultSchema.safeParse(result);
    if (!parsedResult.success) throw Error("It's an error. FIX it ASAP!");
    return parsedResult.data.restaurant;
  }

  static buildImageURL(imageId: string, config?: { size?: "small" | "medium" | "large" }) {
    const imageSize = config?.size || "small";
    return `${IMAGE_URL}/${imageSize}/${imageId}`;
  }
}

export default RestaurantAPI;
