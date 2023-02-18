import { describe, expect, it } from "vitest";
import { fixture, html, aTimeout } from "@open-wc/testing";
import type { FavoriteButton } from "@/components";
import "@/components";
import { favoriteRestaurantDB } from "@/lib/favorite-restaurant-idb";

// @vitest-environment happy-dom
describe("Favorite Button", async () => {
  const el = (await fixture(
    html`<favorite-button
      .restaurant=${{ id: "1", name: "a", description: "", pictureId: "", city: "", rating: 2 }}
    ></favorite-button>`
  )) as FavoriteButton;

  it("can favorite a restaurant", async () => {
    const button = el.shadowRoot?.querySelector("button")!;
    button.click();

    // must wait for re-render and fake-indexeddb to complete. Using only `el.updateComplete` not suffice for some unknown reason.
    await aTimeout(100); // this is bad but works for now
    await el.updateComplete;

    expect(button.textContent?.trim()).match(/remove/i);
  });
  it("can un-favorite a restaurant", async () => {
    const button = el.shadowRoot?.querySelector("button")!;
    expect(button.textContent?.trim()).match(/remove/i);

    button.click();
    await aTimeout(100);
    await el.updateComplete;

    expect(await favoriteRestaurantDB.getSingle("1")).toBe(undefined);
  });
});
