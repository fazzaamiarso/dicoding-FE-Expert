/* eslint-disable no-underscore-dangle */
class HashRouter {
  private _routes: Record<string, any>;

  private _root: HTMLElement;

  constructor({ routes, root }: { routes: Record<string, any>; root: HTMLElement }) {
    this._routes = routes;
    this._root = root;
  }

  public render(pathName: string) {
    const parsedPath = this._parseURLHash(pathName);
    if (!this._checkRouteMatch(parsedPath)) return;

    const pageTemplate = this._routes[parsedPath];
    this._root.innerHTML = pageTemplate.render();
    pageTemplate.pageDidMount();
  }

  private _checkRouteMatch(path: string) {
    const routes = Object.keys(this._routes);
    return routes.includes(path);
  }

  // eslint-disable-next-line class-methods-use-this
  private _parseURLHash(pathHash: string) {
    const parsedURL = pathHash.slice(1);
    return parsedURL;
  }
}

export default HashRouter;
