import { faker } from "@faker-js/faker";
import { describe, expect, it, beforeEach } from "vitest";
import { favoriteRestaurantDB } from "../favorite-restaurant-idb";

const createRestaurant = () => ({
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  pictureId: "",
  city: faker.address.city(),
  rating: faker.datatype.number(5),
});

// @vitest-environment jsdom
describe("favorite-restaurant-idb", async () => {
  beforeEach(() => {
    window.indexedDB = new IDBFactory();
  });
  it("can insert and get single restaurant", async () => {
    const restaurantData = createRestaurant();
    await favoriteRestaurantDB.insertSingle(restaurantData);
    const inserted = await favoriteRestaurantDB.getSingle(restaurantData.id);
    // @ts-ignore
    expect(inserted.id).toEqual(restaurantData.id);
  });

  it("can insert and get multiple restaurants", async () => {
    const restaurantsData = Array(5)
      .fill(0)
      .map(() => createRestaurant());

    await favoriteRestaurantDB.insertMany(restaurantsData);
    const restaurants = await favoriteRestaurantDB.getAll();

    restaurants.forEach((restaurant) => {
      expect(restaurants).toContain(restaurant);
    });
  });

  it("can update a single restaurant", async () => {
    const restaurantData = createRestaurant();
    await favoriteRestaurantDB.insertSingle(restaurantData);
    const updatedRestaurantData = { ...restaurantData, name: faker.company.name() };

    const updatedId = await favoriteRestaurantDB.updateSingle(updatedRestaurantData);
    const newRestaurant = await favoriteRestaurantDB.getSingle(updatedId);
    expect(newRestaurant).toStrictEqual(updatedRestaurantData);
  });

  it("can delete a single restaurant", async () => {
    const restaurantData = createRestaurant();
    await favoriteRestaurantDB.insertSingle(restaurantData);
    const restaurant = await favoriteRestaurantDB.getSingle(restaurantData.id);

    expect(restaurant).toBeDefined();
    await favoriteRestaurantDB.deleteSingle(restaurantData.id);
    expect(restaurant).toBeDefined();
  });
});
