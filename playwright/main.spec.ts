import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const mockRestaurant = {
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  description: "",
  pictureId: faker.image.business(10),
  city: faker.address.city(),
  rating: faker.datatype.number(5),
  address: faker.address.streetAddress(),
  categories: [{ name: faker.commerce.department() }],
  menus: {
    foods: [{ name: faker.commerce.department() }],
    drinks: [{ name: faker.commerce.department() }],
  },
  customerReviews: [{ name: faker.name.firstName(), review: "", date: "12 februari 2020" }],
};

test("Favorite and Un-favorite a restaurant", async ({ page }) => {
  await page.route("https://restaurant-api.dicoding.dev/list", (route) => {
    route.fulfill({
      body: JSON.stringify({
        message: "",
        error: false,
        restaurants: [mockRestaurant],
      }),
    });
  });
  await page.route("https://restaurant-api.dicoding.dev/detail/**", (route) => {
    route.fulfill({
      body: JSON.stringify({
        message: "",
        error: false,
        restaurant: mockRestaurant,
      }),
    });
  });

  await page.goto("/");

  await page.locator("restaurant-card").first().click();
  await expect(page).toHaveURL(/.*restaurants.*/i);

  const favButton = page.locator("favorite-button");
  await favButton.click();
  await expect(favButton.getByRole("button")).toHaveClass(/favorite/i);

  await page
    .getByRole("banner")
    .getByRole("link", { name: /favorite/i })
    .click();
  await expect(page).toHaveURL(/.*favorite.*/i);

  await page.locator("restaurant-card").first().click();
  await expect(page).toHaveURL(/.*restaurants.*/i);

  const favButton2 = page.locator("favorite-button");
  await expect(favButton2.getByRole("button")).toHaveClass(/favorite/i);
  await favButton2.click();

  await page
    .getByRole("banner")
    .getByRole("link", { name: /favorite/i })
    .click();
  await expect(page).toHaveURL(/.*favorite.*/i);
  expect(await page.locator("restaurant-card").count()).toBe(0);
});

test.only("can post a review", async ({ page }) => {
  await page.route("https://restaurant-api.dicoding.dev/list", (route) => {
    route.fulfill({
      body: JSON.stringify({
        message: "",
        error: false,
        restaurants: [mockRestaurant],
      }),
    });
  });
  await page.route("https://restaurant-api.dicoding.dev/detail/**", (route) => {
    route.fulfill({
      body: JSON.stringify({
        message: "",
        error: false,
        restaurant: mockRestaurant,
      }),
    });
  });

  await page.goto("/");
  await page.locator("restaurant-card").first().click();

  const input1 = page.getByLabel(/name/i);
  await input1.type("bambang");
  expect(await input1.inputValue()).toBe("bambang");

  const input2 = page.getByLabel(/review/i);
  await input2.type("food is great, atmosphere too");
  expect(await input2.inputValue()).toBe("food is great, atmosphere too");

  const submitButton = page.getByRole("button", { name: /submit/i });
  await submitButton.focus();
  await expect(submitButton).toBeFocused();

  //TODO: HANDLE POST SUBMIT
});