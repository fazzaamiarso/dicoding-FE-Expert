import RestaurantAPI from "../api";

class HomePage {
  static render() {
    return `
    <div class="hero">
        <div class="hero__overlay"></div>
        <img class="hero__img" src="./images/heros/hero-image_2.jpg" alt="">
        <div class="hero__content">
        <div class="hero__content--inner">
            <div class="hero__text">
            <h2 class="hero__header">Find Your Next Favourite Restaurants</h2>
            <p class="hero__desc">Our catalog is a curated list of restaurant from all over Indonesia</p>
            </div>
            <div class="hero__cta-group">          
            <a href="#explore" class="hero__cta hero__cta--primary"><span>Explore Now </span>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>              
            </a>
            <a href="#" class="hero__cta hero__cta--secondary">Learn more</a>
            </div>
        </div>
        </div>
    </div>
    <div id="explore" class="catalog">
        <h2 class="catalog__header">Explore Restaurants</h2>
        <ul id="catalog-list" class="catalog__list"></ul>
    </div>
    `;
  }

  static async pageDidMount() {
    const catalogList = document.querySelector("#catalog-list");
    const data = await RestaurantAPI.getAll();

    data.restaurants.forEach((r: any) => {
      const formattedRating = new Intl.NumberFormat("en-US", { minimumFractionDigits: 1 }).format(
        r.rating
      );
      const item = document.createElement("li");
      item.classList.add("catalog__card");
      item.innerHTML = `
          <div class="catalog__thumb">
            <img src="${RestaurantAPI.buildImageURL(r.pictureId)}" alt="${
        r.name
      } restaurant" class="catalog__img"/>
            <div class="catalog__overlay"></div>
          </div>
          <div class="catalog__content">
            <h3 class="catalog__title">${r.name}</h3>
            <div class="catalog__detail">
              <span class="catalog__rating">
                <svg class="catalog__star" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
                ${formattedRating}
              </span>
                  -
                <span>${r.city}</span>
            </div>
            <a href="#/restaurants/${r.id}">See detail</a>
          </div>`;

      catalogList.appendChild(item);
    });
  }
}

export default HomePage;
