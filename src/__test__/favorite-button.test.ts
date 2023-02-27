import { describe, expect, it, beforeAll } from "vitest";
import { fixture, html } from "@open-wc/testing";
import { screen } from "shadow-dom-testing-library";
import { waitFor } from "@testing-library/dom";
import "@/components";
import { favoriteRestaurantDB } from "@/lib/favorite-restaurant-idb";

// @vitest-environment jsdom

const mockRestaurant = { id: "1", name: "a", description: "", pictureId: "", city: "", rating: 2 };

beforeAll(async () => {
  await fixture(html`<favorite-button .restaurant=${mockRestaurant}></favorite-button>`);
});
describe("favorite-button", async () => {
  it("can favorite a restaurant", async () => {
    const favButton = await screen.findByShadowRole("button");
    favButton.click();
    await waitFor(() => {
      expect(favButton.textContent?.trim()).match(/remove/i);
    });
    expect(await favoriteRestaurantDB.getSingle("1")).toEqual(mockRestaurant);
  });

  it("can un-favorite a restaurant", async () => {
    const favButton = await screen.findByShadowRole("button");
    expect(favButton.textContent?.trim()).match(/remove/i);

    favButton.click();
    await waitFor(async () => {
      expect(await favoriteRestaurantDB.getSingle("1")).toBe(undefined);
    });
  });
});
