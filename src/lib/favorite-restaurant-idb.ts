import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Restaurant } from "@/types/restaurant-api";

const DATABASE_NAME = "favorite-restaurants";
const RESTAURANT_STORE_NAME = "restaurants";

interface FavoriteRestaurants extends DBSchema {
  [RESTAURANT_STORE_NAME]: {
    key: string;
    value: Restaurant;
  };
}

class FavoriteRestaurantsDB {
  private _dbPromise: Promise<IDBPDatabase<FavoriteRestaurants>> | undefined;

  constructor() {
    if (!("indexedDB" in window)) {
      // eslint-disable-next-line no-console
      console.log("This browser doesn't support IndexedDB.");
      return;
    }

    this._dbPromise = openDB<FavoriteRestaurants>(DATABASE_NAME, 1, {
      upgrade(database) {
        if (database.objectStoreNames.contains(RESTAURANT_STORE_NAME)) return;
        database.createObjectStore(RESTAURANT_STORE_NAME, { keyPath: "id" });
      },
    });
  }

  public checkIsSupported() {
    return "indexedDB" in window;
  }

  public async getAll() {
    if (!this._dbPromise) throw new Error("Your browser doesn't support this feature!");
    return (await this._dbPromise).getAll(RESTAURANT_STORE_NAME);
  }

  public async getSingle(restaurantId: string) {
    if (!this._dbPromise) throw new Error("Your browser doesn't support this feature!");
    return (await this._dbPromise).get(RESTAURANT_STORE_NAME, restaurantId);
  }

  public async deleteSingle(restaurantId: string) {
    if (!this._dbPromise) throw new Error("Your browser doesn't support this feature!");
    return (await this._dbPromise).delete(RESTAURANT_STORE_NAME, restaurantId);
  }

  public async insertSingle(restaurant: Restaurant) {
    if (!this._dbPromise) throw new Error("Your browser doesn't support this feature!");
    return (await this._dbPromise).add(RESTAURANT_STORE_NAME, restaurant);
  }

  public async insertMany(restaurants: Restaurant[]) {
    if (!this._dbPromise) throw new Error("Your browser doesn't support this feature!");
    const tx = (await this._dbPromise).transaction(RESTAURANT_STORE_NAME, "readwrite");
    await Promise.all([...restaurants.map((restaurant) => tx.store.add(restaurant)), tx.done]);
  }

  public async updateSingle(restaurant: Restaurant) {
    if (!this._dbPromise) throw new Error("Your browser doesn't support this feature!");
    return (await this._dbPromise).put(RESTAURANT_STORE_NAME, restaurant);
  }
}

export const favoriteRestaurantDB = new FavoriteRestaurantsDB();
