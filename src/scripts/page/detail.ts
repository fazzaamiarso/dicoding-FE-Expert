import RestaurantAPI from "../api";

class Detail {
  static render() {
    return `
        <div id="detail" class="detail">
        </div>
      `;
  }

  static async pageDidMount(params: Record<string, any>) {
    const container = document.querySelector("#detail");
    const details = await RestaurantAPI.getById(params.id);

    container.innerHTML = `
        <img src="${RestaurantAPI.buildImageURL(details.restaurant.pictureId)}" alt="" />
        <h2>${details.restaurant.name}</h2>
        <p>${details.restaurant.description}</p>
    `;
  }
}

export default Detail;
