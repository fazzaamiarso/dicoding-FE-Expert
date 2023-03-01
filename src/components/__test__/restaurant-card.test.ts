/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, expect, it } from "vitest";
import { fixture } from "@open-wc/testing";
import { html } from "lit/static-html.js";
import type { RestaurantCard } from "@/components";
import "@/components/restaurant-card";

// @vitest-environment jsdom
describe("restaurant-card", () => {
  it("render the component", async () => {
    const card = (await fixture(
      html`<restaurant-card .restaurant=${undefined} ?loading=${false}></restaurant-card>`
    )) as RestaurantCard;
    await card.updateComplete;
    expect(card.loading).to.be.false;
  });
});
