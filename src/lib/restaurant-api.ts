import { z } from "zod";
import { restaurantAPIConfig } from "@/constants";
import {
  apiResponseSchema,
  restaurantSchema,
  restaurantDetailSchema,
} from "@/types/restaurant-api";

const indonesianMonths = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
];

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

  static formatDateToNativeDate(date: string) {
    const dateEntries: [string, number][] = Array.from(indonesianMonths, (v, k) => [v, k]);
    const dateMap = new Map(dateEntries);

    const splittedDate = date.split(" ");
    const monthGetter = splittedDate[1].toLowerCase();
    const month = dateMap.get(monthGetter) + 1;
    const year = splittedDate[2];
    const day = splittedDate[0];
    return `${year}/${month}/${day}`;
  }
}

export default RestaurantAPI;
