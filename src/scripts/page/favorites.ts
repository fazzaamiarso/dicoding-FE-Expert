class Favorites {
  static render() {
    return `
        <div class="favorite">
            <h2>Favorite Restaurants</h2>
            <restaurant-card></restaurant-card>
        </div>
    `;
  }

  static pageDidMount() {}
}

export default Favorites;
