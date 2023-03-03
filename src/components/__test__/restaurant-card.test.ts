/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, expect, it, afterEach } from "vitest";
import { fixture, expect as DOMExpect, fixtureCleanup } from "@open-wc/testing";
import { html } from "lit/static-html.js";
import { screen } from "shadow-dom-testing-library";
import { faker } from "@faker-js/faker";
import { RestaurantCard } from "@/components";
import "@/components/restaurant-card";

// @vitest-environment jsdom

const restaurant = {
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  description: faker.company.catchPhrase(),
  pictureId: "",
  city: faker.address.cityName(),
  rating: faker.datatype.number(5),
};

afterEach(() => {
  fixtureCleanup();
});

describe("restaurant-card", () => {
  it("render skeleton when no restaurant", async () => {
    await fixture(html`<restaurant-card></restaurant-card>`);
    DOMExpect(await screen.findByShadowTestId("loading-catalog")).to.exist;
  });

  it("render skeleton when loading", async () => {
    await fixture(
      html`<restaurant-card ?loading=${true} .restaurant=${restaurant}></restaurant-card>`
    );
    DOMExpect(await screen.findByShadowTestId("loading-catalog")).to.exist;
  });

  it("set the restaurant property correctly", async () => {
    const card = (await fixture(
      html`<restaurant-card .restaurant=${restaurant}></restaurant-card>`
    )) as RestaurantCard;
    expect(card.restaurant).toStrictEqual(restaurant);
  });
});
