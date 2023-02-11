/* eslint-disable no-console */
import { z } from "zod";
import { restaurantAPIConfig } from "@/constants";
import {
  apiResponseSchema,
  restaurantSchema,
  restaurantDetailSchema,
  AddReviewInput,
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

const { BASE_URL, IMAGE_URL, POST_REVIEW_URL } = restaurantAPIConfig;

class RestaurantAPI {
  static async getAll() {
    const response = await fetch(`${BASE_URL}/list`, { method: "GET" });
    const result = await response.json();

    const resultSchema = apiResponseSchema.extend({ restaurants: z.array(restaurantSchema) });
    const parsedResult = resultSchema.safeParse(result);

    if (!parsedResult.success) {
      console.error(parsedResult.error.flatten);
      throw new Error("Bad request payload!");
    }

    if (parsedResult.data.error) {
      console.error(parsedResult.data.message);
      throw new Error("Something went wrong!");
    }

    return parsedResult.data.restaurants;
  }

  static async getById(id: string) {
    // Use no-cache because fetch cache the response when posting, unabling to refetch on page reload.
    const response = await fetch(`${BASE_URL}/detail/${id}`, { method: "GET", cache: "no-cache" });
    const result = await response.json();

    const resultSchema = apiResponseSchema.extend({ restaurant: restaurantDetailSchema });
    const parsedResult = resultSchema.safeParse(result);

    if (!parsedResult.success) {
      console.error(parsedResult.error.flatten);
      throw new Error("Bad request payload!");
    }

    if (parsedResult.data.error) {
      console.error(parsedResult.data.message);
      throw new Error("Something went wrong!");
    }

    return parsedResult.data.restaurant;
  }

  static async postSingleReview({ id, name, review }: AddReviewInput) {
    const fetchConfig: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, review }),
    };

    const response = await fetch(POST_REVIEW_URL, fetchConfig);
    const result = await response.json();
    const parsedResult = apiResponseSchema.safeParse(result);

    if (!parsedResult.success) {
      console.error(parsedResult.error.flatten);
      throw new Error("Something went wrong!");
    }
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
    const month = dateMap.get(monthGetter) || 0 + 1;
    const year = splittedDate[2];
    const day = splittedDate[0];
    return `${year}/${month}/${day}`;
  }
}

export default RestaurantAPI;
