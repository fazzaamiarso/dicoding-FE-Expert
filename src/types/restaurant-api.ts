import { z } from "zod";

const withId = z.object({ id: z.string() });

export const restaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  pictureId: z.string(),
  city: z.string(),
  rating: z.number(),
});

export const reviewSchema = z.object({
  name: z.string(),
  review: z.string(),
  date: z.string(),
});

export const addReviewSchema = reviewSchema.omit({ date: true }).merge(withId);

export const restaurantDetailSchema = restaurantSchema.extend({
  address: z.string(),
  categories: z.array(z.object({ name: z.string() })),
  menus: z.object({
    foods: z.array(z.object({ name: z.string() })),
    drinks: z.array(z.object({ name: z.string() })),
  }),
  customerReviews: z.array(reviewSchema),
});

export const apiResponseSchema = z.object({
  error: z.boolean(),
  message: z.string(),
});

export type Restaurant = z.infer<typeof restaurantSchema>;
export type RestaurantWithDetail = z.infer<typeof restaurantDetailSchema>;
export type AddReviewInput = z.infer<typeof addReviewSchema>;