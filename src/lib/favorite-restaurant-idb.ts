import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Restaurant } from "../api";

const DATABASE_NAME = "favorite-restaurants";
const RESTAURANT_STORE_NAME = "restaurants";

interface FavoriteRestaurants extends DBSchema {
  [RESTAURANT_STORE_NAME]: {
    key: string;
    value: Restaurant;
  };
}

class FavoriteRestaurantsDB {
  private _dbPromise: Promise<IDBPDatabase<FavoriteRestaurants>>;

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

  public async getAll() {
    return (await this._dbPromise).getAll(RESTAURANT_STORE_NAME);
  }

  public async getSingle(restaurantId: string) {
    return (await this._dbPromise).get(RESTAURANT_STORE_NAME, restaurantId);
  }

  public async deleteSingle(restaurantId: string) {
    return (await this._dbPromise).delete(RESTAURANT_STORE_NAME, restaurantId);
  }

  public async insertSingle(restaurant: Restaurant) {
    return (await this._dbPromise).add(RESTAURANT_STORE_NAME, restaurant);
  }

  public async updateSingle(restaurant: Restaurant) {
    return (await this._dbPromise).put(RESTAURANT_STORE_NAME, restaurant);
  }
}

// eslint-disable-next-line import/prefer-default-export
export const favoriteRestaurantDB = new FavoriteRestaurantsDB();
