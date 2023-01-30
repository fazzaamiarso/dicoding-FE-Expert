// eslint-disable-next-line max-classes-per-file
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import RestaurantAPI, { Restaurant } from "../api";

class HomePage {
  static render() {
    return "<home-page></home-page>";
    // return `
    // <div class="hero">
    //     <div class="hero__overlay"></div>
    //     <img class="hero__img" src="./images/heros/hero-image_2.jpg" alt="">
    //     <div class="hero__content">
    //     <div class="hero__content--inner">
    //         <div class="hero__text">
    //         <h2 class="hero__header">Find Your Next Favourite Restaurants</h2>
    //         <p class="hero__desc">Our catalog is a curated list of restaurant from all over Indonesia</p>
    //         </div>
    //         <div class="hero__cta-group">
    //         <a href="#explore" class="hero__cta hero__cta--primary"><span>Explore Now </span>
    //             <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    //             <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
    //             </svg>
    //         </a>
    //         <a href="#" class="hero__cta hero__cta--secondary">Learn more</a>
    //         </div>
    //     </div>
    //     </div>
    // </div>
    // <div id="explore" class="catalog">
    //     <h2 class="catalog__header">Explore Restaurants</h2>
    //     <ul id="catalog-list" class="catalog__list"></ul>
    // </div>
    // `;
  }

  static async pageDidMount() {
    //   const catalogList = document.querySelector("#catalog-list");
    //   const response = await RestaurantAPI.getAll();
    //   if (response.error) {
    //     catalogList.innerHTML = `
    //       <p>${response.message}</p>
    //     `;
    //     return;
    //   }
    //   response.data.forEach((restaurant) => {
    //     const restaurantCard = document.createElement("restaurant-card");
    //     restaurantCard.restaurant = restaurant;
    //     catalogList.appendChild(restaurantCard);
    //   });
  }
}

export default HomePage;

@customElement("home-page")
export class Page extends LitElement {
  @property()
  restaurants: Restaurant[] = [];

  async connectedCallback() {
    super.connectedCallback();
    const response = await RestaurantAPI.getAll();
    this.restaurants = response.data;
  }

  render() {
    return html`
      <div class="hero">
        <div class="hero__overlay"></div>
        <img class="hero__img" src="./images/heros/hero-image_2.jpg" alt="" />
        <div class="hero__content">
          <div class="hero__content--inner">
            <div class="hero__text">
              <h2 class="hero__header">Find Your Next Favourite Restaurants</h2>
              <p class="hero__desc">
                Our catalog is a curated list of restaurant from all over Indonesia
              </p>
            </div>
            <div class="hero__cta-group">
              <a href="#explore" class="hero__cta hero__cta--primary"
                ><span>Explore Now </span>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" class="hero__cta hero__cta--secondary">Learn more</a>
            </div>
          </div>
        </div>
      </div>
      <div id="explore" class="catalog">
        <h2 class="catalog__header">Explore Restaurants</h2>
        <ul id="catalog-list" class="catalog__list">
          ${this.restaurants.map(
            (restaurant) => html`<restaurant-card .restaurant=${restaurant}></restaurant-card>`
          )}
        </ul>
      </div>
    `;
  }
}
