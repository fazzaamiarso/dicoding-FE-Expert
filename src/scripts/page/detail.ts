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
    const response = await RestaurantAPI.getById(params.id);

    if (response.error) {
      container.innerHTML = `
        <p>${response.message}</p>
      `;
      return;
    }

    container.innerHTML = `
        <img src="${RestaurantAPI.buildImageURL(response.data.pictureId)}" alt="" />
        <h2>${response.data.name}</h2>
        <p>${response.data.description}</p>
    `;
  }
}

export default Detail;
