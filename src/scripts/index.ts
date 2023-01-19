/* eslint-disable no-underscore-dangle */
import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import catalog from "../DATA.json";

type Restaurant = (typeof catalog)["restaurants"][number];

class CatalogItem extends HTMLElement {
  private _restaurants: Restaurant[];

  constructor() {
    super();
    console.log();
  }

  set restaurants(val: Restaurant[]) {
    this._restaurants = val;
    val.forEach((r) => {
      const li = document.createElement("li");

      const img = document.createElement("img");
      img.src = r.pictureId;
      img.alt = r.name;

      const name = document.createElement("h3");
      const detail = document.createElement("div");
      const city = document.createElement("span");
      const rating = document.createElement("span");

      name.textContent = r.name;
      city.textContent = r.city;
      rating.textContent = String(r.rating);
      detail.append(rating, city);

      li.append(img, name, detail);
      const main = document.querySelector("main");
      main.append(li);
    });
  }
}

customElements.define("catalog-item", CatalogItem);

const catalogEl = document.querySelector("catalog-item") as CatalogItem;
catalogEl.restaurants = catalog.restaurants;
