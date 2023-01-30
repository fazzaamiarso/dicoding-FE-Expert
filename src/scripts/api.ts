import { z } from "zod";
import { restaurantAPIConfig } from "./constants";

const restaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  pictureId: z.string(),
  city: z.string(),
  rating: z.number(),
});

const reviewSchema = z.object({
  name: z.string(),
  review: z.string(),
  date: z.string(),
});

const restaurantDetailSchema = restaurantSchema.extend({
  address: z.string(),
  categories: z.array(z.object({ name: z.string() })),
  menus: z.object({
    foods: z.array(z.object({ name: z.string() })),
    drinks: z.array(z.object({ name: z.string() })),
  }),
  customerReviews: z.array(reviewSchema),
});

const apiResponseSchema = z.object({
  error: z.boolean(),
  message: z.string(),
});

const { BASE_URL, IMAGE_URL } = restaurantAPIConfig;

export type Restaurant = z.infer<typeof restaurantSchema>;
export type RestaurantWithDetail = z.infer<typeof restaurantDetailSchema>;

class RestaurantAPI {
  static async getAll() {
    const response = await fetch(`${BASE_URL}/list`, { method: "GET" });
    const result = await response.json();

    const resultSchema = apiResponseSchema.extend({ restaurants: z.array(restaurantSchema) });
    const parsedResult = resultSchema.safeParse(result);
    if (parsedResult.success) {
      return { error: false, data: parsedResult.data.restaurants };
    }
    return { error: true, message: "It's an error. FIX it ASAP!" };
  }

  static async getById(id: string) {
    const response = await fetch(`${BASE_URL}/detail/${id}`, { method: "GET" });
    const result = await response.json();

    const resultSchema = apiResponseSchema.extend({ restaurant: restaurantDetailSchema });
    const parsedResult = resultSchema.safeParse(result);
    if (parsedResult.success) {
      return { error: false, data: parsedResult.data.restaurant };
    }
    return { error: true, message: "It's an error. FIX it ASAP!" };
  }

  static buildImageURL(imageId: string, config?: { size?: "small" | "medium" | "large" }) {
    const imageSize = config?.size || "small";
    return `${IMAGE_URL}/${imageSize}/${imageId}`;
  }
}

export default RestaurantAPI;
