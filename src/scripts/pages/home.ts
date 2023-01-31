/* eslint-disable import/extensions */
// eslint-disable-next-line max-classes-per-file
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import RestaurantAPI, { Restaurant } from "../api";

const styles = css`
  .hero {
    margin-bottom: 2rem;
    position: relative;
    max-height: 640px;
    overflow: hidden;
  }

  .hero__overlay {
    position: absolute;
    inset: 0;
    background: #0c111a;
    opacity: 0.55;
  }
  .hero__img {
    width: 100%;
  }
  @media screen and (min-width: 1200px) {
    .hero__img {
      min-width: 1000px;
    }
  }
  .hero__content {
    width: 100%;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .hero__content--inner {
    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
    color: white;
  }
  .hero__text {
    padding: 2rem 0.5rem;
    background-image: radial-gradient(black, transparent 70%);
  }
  .hero__header {
    color: var(--text-indigo-400);
    font-size: 1.3rem;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  @media screen and (min-width: 640px) {
    .hero__header {
      font-size: 2rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .hero__header {
      font-size: 3rem;
    }
  }
  .hero__desc {
    font-size: var(--text-sm);
    color: var(--text-indigo-100);
  }
  @media screen and (min-width: 640px) {
    .hero__desc {
      font-size: 1.1rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .hero__desc {
      font-size: 1.5rem;
    }
  }
  .hero__cta-group {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .hero__cta {
    @extend .click-area;
    display: inline-flex;
    align-items: center;

    text-decoration: none;
    border-radius: var(--rounded-sm);
    background-color: transparent;

    font-size: var(--text-xs);
    font-weight: 600;
    padding: 0.5rem 0.75rem;
  }
  @media screen and (min-width: 768px) {
    .hero__cta {
      font-size: 1rem;
      padding: 0.75rem 1rem;
    }
  }
  .hero__cta:focus-visible {
    outline: 2px solid white;
    outline-offset: 4px;
  }

  .hero__cta--primary {
    color: white;
    background-color: var(--text-indigo-600);

    gap: 0.25rem;

    box-shadow: var(--shadow-md);
    border: var(--text-indigo-600 solid 1px);
    transition: all 200ms ease;
  }
  .hero__cta--primary:hover {
    background-color: var(--text-indigo-700);
  }
  .hero__cta--primary svg {
    width: 18px;
  }

  .hero__cta--secondary {
    color: var(--text-indigo-50);
    border: var(--text-indigo-50 solid 1px);
    border-radius: var(--rounded-sm);
    transition: 200ms all ease;
  }
  .hero__cta--secondary:hover {
    border-color: transparent;
  }

  catalog__header {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }
  @media screen and (min-width: 648px) {
    font-size: 1.5rem;
  }

  .catalog {
    width: 90%;
    margin-inline: auto;
    max-width: 1200px;
  }
  .catalog__list {
    padding: 0;
    width: 100%;
    list-style: none;

    display: grid;
    gap: 1.5rem;
  }
  @media screen and (min-width: 648px) {
    .catalog__list {
      column-gap: 2.25rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media screen and (min-width: 1024px) {
    .catalog__list {
      column-gap: 2.75rem;
      row-gap: 2.25rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`;

@customElement("home-page")
export default class HomePage extends LitElement {
  static styles = [styles];

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