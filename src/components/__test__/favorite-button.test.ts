import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { fixture, fixtureCleanup, html } from "@open-wc/testing";
import { screen } from "shadow-dom-testing-library";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import "@/components";
import { favoriteRestaurantDB } from "@/lib/favorite-restaurant-idb";

// @vitest-environment jsdom

const restaurant = {
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  description: faker.company.catchPhrase(),
  pictureId: "",
  city: faker.address.cityName(),
  rating: faker.datatype.number(5),
};

const user = userEvent.setup();
indexedDB = new IDBFactory();

describe("favorite-button", async () => {
  describe("when restaurant is defined", async () => {
    let favButton: HTMLButtonElement;
    beforeAll(async () => {
      await fixture(html`<favorite-button .restaurant=${restaurant}></favorite-button>`);
      favButton = (await screen.findByShadowRole("button")) as HTMLButtonElement;
    });
    afterAll(() => {
      fixtureCleanup();
    });

    it("can favorite a restaurant", async () => {
      await user.click(favButton);
      await waitFor(async () => {
        expect(favButton.textContent?.trim()).match(/remove/i);
        expect(await favoriteRestaurantDB.getSingle(restaurant.id)).toEqual(restaurant);
      });
    });

    it("can un-favorite a restaurant", async () => {
      expect(favButton.textContent?.trim()).match(/remove/i);
      await user.click(favButton);
      await waitFor(async () => {
        expect(await favoriteRestaurantDB.getSingle(restaurant.id)).toBeUndefined();
      });
    });
  });

  describe("when restaurant is not defined", async () => {
    it("can't toggle the state", async () => {
      await fixture(html`<favorite-button></favorite-button>`);
      const favButton = await screen.findByShadowRole("button");

      expect(favButton.textContent?.trim()).match(/add to favorite/i);
      await user.click(favButton);
      expect(favButton.textContent?.trim()).match(/add to favorite/i);
    });
  });
});
