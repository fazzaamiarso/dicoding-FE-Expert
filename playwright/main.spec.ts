import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

let mockRestaurant = {
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

const createApiResponse = <T extends {}>(data: T) => {
  return {
    body: JSON.stringify({
      message: "",
      error: false,
      ...data,
    }),
  };
};

test.describe("Core features", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    await page.route("**/*", (route) =>
      route.request().resourceType() === "image" ? route.abort() : route.continue()
    );
    await page.route("https://restaurant-api.dicoding.dev/list", (route) =>
      route.fulfill(createApiResponse({ restaurants: [mockRestaurant] }))
    );
    await page.route("https://restaurant-api.dicoding.dev/detail/**", (route) => {
      route.fulfill(createApiResponse({ restaurant: mockRestaurant }));
    });
  });

  test.beforeEach(async () => {
    await page.goto("/");
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  test("Favorite and Un-favorite a restaurant", async () => {
    await page.locator("restaurant-card").first().click();
    await page.waitForURL((url) => url.pathname.includes("restaurant"));

    const favButton = page.locator("favorite-button");
    await favButton.click();
    await expect(favButton.getByRole("button")).toHaveClass(/favorite/i);

    await page
      .getByRole("banner")
      .getByRole("link", { name: /favorite/i })
      .click();
    await expect(page).toHaveURL(/.*favorite.*/i);

    // Un-favorite a restaurant
    await page.locator("restaurant-card").first().click();
    await page.waitForURL((url) => url.pathname.includes("restaurant"));

    const filledFavButton = page.locator("favorite-button");
    await expect(filledFavButton.getByRole("button")).toHaveClass(/favorite/i);
    await filledFavButton.click();

    await page
      .getByRole("banner")
      .getByRole("link", { name: /favorite/i })
      .click();
    await expect(page.locator("restaurant-card")).toHaveCount(0);
  });

  test("can post a review", async () => {
    await page.route("https://restaurant-api.dicoding.dev/review", (route) => {
      const formData = route.request().postDataJSON();
      mockRestaurant.customerReviews.push({
        name: formData.name,
        review: formData.review,
        date: "23 maret 2020",
      });
      route.fulfill(createApiResponse({}));
    });

    await page.locator("restaurant-card").first().click();

    const customer = {
      name: faker.name.firstName(),
      review: faker.lorem.sentence(),
    };
    const nameInput = page.getByLabel(/name/i);
    await nameInput.fill(customer.name);

    const reviewInput = page.getByLabel(/review/i);
    await reviewInput.fill(customer.review);

    await expect(nameInput).toHaveValue(customer.name);
    await expect(reviewInput).toHaveValue(customer.review);

    const submitButton = page.getByRole("button", { name: /submit/i });
    await submitButton.click();

    await expect(page.getByTestId("review-item")).toHaveCount(2);
  });
});
