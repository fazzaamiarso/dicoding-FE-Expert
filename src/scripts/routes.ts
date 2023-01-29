/* eslint-disable no-underscore-dangle */

interface Route {
  render(...args: any[]): string;
  pageDidMount(...args: any[]): void;
}

class HashRouter {
  private _routes: Record<string, any>;

  private _root: HTMLElement;

  private _params: Record<string, string>;

  private _routeMatch: string;

  constructor({ routes, root }: { routes: Record<string, Route>; root: HTMLElement }) {
    this._routes = routes;
    this._root = root;
  }

  public async render(pathName: string) {
    const parsedPath = this._removeHash(pathName);
    if (!this._checkRouteMatch(parsedPath)) return;

    const pageTemplate = this._routes[this._routeMatch];
    this._root.innerHTML = pageTemplate.render(this._params);
    await pageTemplate.pageDidMount(this._params);
  }

  private _checkRouteMatch(path: string) {
    const isMatched = Boolean(this._matchRoute(path));
    return isMatched;
  }

  private _matchRoute(urlPath: string) {
    const paramsMap = new Map();

    const routes = Object.keys(this._routes);
    const matchedRoute = routes.find((route) => {
      const routeSegments = route
        .split("/")
        .slice(1)
        .filter((r) => r !== "");
      const urlSegments = urlPath
        .split("/")
        .slice(1)
        .filter((r) => r !== "");

      if (routeSegments.length !== urlSegments.length) return false;

      const isMatched = routeSegments.every((segment, idx) => {
        const isParam = segment.startsWith(":");
        const isPathMatch = segment === urlSegments[idx];
        return isPathMatch || isParam;
      });

      if (isMatched) {
        routeSegments.forEach((segment, idx) => {
          if (segment.startsWith(":")) {
            paramsMap.set(segment.slice(1), urlSegments[idx]);
          }
        });
        this._routeMatch = route;
        this._params = Object.fromEntries(paramsMap.entries());
        return true;
      }
      return false;
    });

    return matchedRoute;
  }

  // eslint-disable-next-line class-methods-use-this
  private _removeHash(pathHash: string) {
    const parsedURL = pathHash.slice(1);
    return parsedURL;
  }
}

export default HashRouter;
