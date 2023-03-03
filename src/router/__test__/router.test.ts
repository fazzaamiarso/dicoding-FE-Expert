/* eslint-disable @typescript-eslint/no-unused-expressions */
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { fixture, fixtureCleanup, html, expect as DOMExpect } from "@open-wc/testing";
import { screen } from "shadow-dom-testing-library";
import HistoryRouter from "../router";
import "./utils/fallback";

// @vitest-environment jsdom
describe("History Router", async () => {
  let outlet: HTMLElement;
  beforeEach(async () => {
    await fixture(html`<div data-testid="test-container"></div>`);
    outlet = screen.getByTestId("test-container");
  });
  afterEach(() => {
    fixtureCleanup();
  });

  it("configure routes properly with setter", async () => {
    const router = new HistoryRouter({ outlet });
    router.setRoutes([{ path: "/", component: "div" }]);
    expect(router.getRoutes()).toStrictEqual([{ path: "/", component: "div" }]);
  });

  it("configure routes properly constructor", async () => {
    const router = new HistoryRouter({
      outlet,
      routes: [{ path: "/", component: "div" }],
    });
    expect(router.getRoutes()).toStrictEqual([{ path: "/", component: "div" }]);
  });

  it("navigate properly with static method", async () => {
    const router = new HistoryRouter({ outlet });
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
    outlet = await fixture(html`<a href="/navigate-to">click me</a>`);

    const router = new HistoryRouter({ outlet });
    router.setRoutes([
      { path: "/", component: "div" },
      { path: "/navigate", component: "div" },
    ]);
    screen.getByRole("link").click();
    expect(window.location.pathname).toBe("/navigate-to");
  });

  it("navigate to a url with dynamic params", async () => {
    const router = new HistoryRouter({ outlet });
    router.setRoutes([
      { path: "/", component: "div" },
      { path: "/posts/:id", component: "div" },
    ]);
    HistoryRouter.navigate("/posts/12345");
    expect(window.location.pathname).toEqual("/posts/12345");
  });

  describe("route not found", () => {
    it("render default fallback if not configured", async () => {
      const router = new HistoryRouter({ outlet });
      router.setRoutes([
        { path: "/", component: "div" },
        { path: "/route1", component: "div" },
        { path: "/route2", component: "div" },
      ]);
      HistoryRouter.navigate("/route3");
      expect(document.title).toContain("404 | Page not found");
    });

    it("render configured fallback", async () => {
      const router = new HistoryRouter({
        outlet,
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
