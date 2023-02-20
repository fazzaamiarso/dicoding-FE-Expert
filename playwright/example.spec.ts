import { test, expect } from "@playwright/test";

test("Home Page", async ({ page }) => {
  await page.route("https://restaurant-api.dicoding.dev/list", (route) => {
    route.fulfill({
      body: JSON.stringify({
        message: "",
        error: false,
        restaurants: [{ id: "1", name: "a", description: "", pictureId: "", city: "", rating: 2 }],
      }),
    });
  });
  await page.goto("/");
  expect(await page.locator("restaurant-card").count()).toEqual(1);
});
