/* eslint-disable @typescript-eslint/no-unused-expressions */
import { afterEach, describe, expect, it } from "vitest";
import { fixture, fixtureCleanup, html, expect as DOMExpect } from "@open-wc/testing";
import { screen } from "shadow-dom-testing-library";
import "@/components";
import HistoryRouter from "../router";
import "./utils/fallback";

// @vitest-environment jsdom
describe("History Router", async () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it("set routes properly", async () => {
    await fixture(html`<div data-testid="placeholder"></div>`);
    const router = new HistoryRouter({ outlet: screen.getByTestId("placeholder") });
    router.setRoutes([{ path: "/", component: "lazy-image" }]);
    expect(router.getRoutes()).toStrictEqual([{ path: "/", component: "lazy-image" }]);
  });

  it("navigate properly with static method", async () => {
    await fixture(html`<div data-testid="placeholder"></div>`);
    const router = new HistoryRouter({ outlet: screen.getByTestId("placeholder") });
    router.setRoutes([
      { path: "/", component: "div" },
      { path: "/random", component: "div" },
    ]);
    HistoryRouter.navigate("/random");
    expect(window.location.pathname).toBe("/random");
    HistoryRouter.navigate("/");
    expect(window.location.pathname).toBe("/");
  });

  it("navigate properly with href", async () => {
    await fixture(html`<div data-testid="placeholder"><a href="/navigate-to">Click me</a></div>`);
    const router = new HistoryRouter({ outlet: screen.getByTestId("placeholder") });
    router.setRoutes([
      { path: "/", component: "div" },
      { path: "/navigate", component: "div" },
    ]);
    screen.getByRole("link").click();
    expect(window.location.pathname).toBe("/navigate-to");
  });

  describe("route not found", () => {
    it("render default fallback if not configured", async () => {
      await fixture(html`<div data-testid="placeholder"></div>`);
      const router = new HistoryRouter({ outlet: screen.getByTestId("placeholder") });
      router.setRoutes([
        { path: "/", component: "div" },
        { path: "/route1", component: "div" },
        { path: "/route2", component: "div" },
      ]);
      HistoryRouter.navigate("/route3");
      expect(document.title).toContain("404 | Page not found");
    });

    it("render configured fallback", async () => {
      await fixture(html`<div data-testid="placeholder"></div>`);
      const router = new HistoryRouter({
        outlet: screen.getByTestId("placeholder"),
        fallbackPage: "fallback-test",
      });
      router.setRoutes([
        { path: "/", component: "div" },
        { path: "/route1", component: "div" },
        { path: "/route2", component: "div" },
      ]);
      HistoryRouter.navigate("/route3");
      DOMExpect(await screen.findByShadowTestId("fallback-test")).to.exist;
    });
  });
});
