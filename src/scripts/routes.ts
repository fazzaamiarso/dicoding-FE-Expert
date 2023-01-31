/* eslint-disable no-underscore-dangle */
interface RouteDef {
  path: string;
  component?: string;
}

interface TemporaryEl extends HTMLElement {
  location: Record<string, any>;
}

class HashRouter {
  private _routes: RouteDef[];

  private _root: HTMLElement;

  private _params: Record<string, string>;

  private _routeMatchIdx: number;

  constructor({ routes, root }: { routes: RouteDef[]; root: HTMLElement }) {
    this._routes = routes;
    this._root = root;
  }

  public async render(pathName: string) {
    const parsedPath = this._removeHash(pathName);
    if (!this._checkRouteMatch(parsedPath)) return;

    const pageOutlet = this._routes[this._routeMatchIdx];
    const pageEl = document.createElement(pageOutlet.component) as TemporaryEl;
    pageEl.location = { params: this._params };
    this._root.innerHTML = "";
    this._root.appendChild(pageEl);
  }

  private _checkRouteMatch(path: string) {
    const isMatched = Boolean(this._matchRoute(path));
    return isMatched;
  }

  private _matchRoute(urlPath: string) {
    const paramsMap = new Map();

    const matchedRouteIdx = this._routes.findIndex((route) => {
      const routeSegments = route.path
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
        this._params = Object.fromEntries(paramsMap.entries());
        return true;
      }
      return false;
    });

    this._routeMatchIdx = matchedRouteIdx;
    return matchedRouteIdx > -1;
  }

  // eslint-disable-next-line class-methods-use-this
  private _removeHash(pathHash: string) {
    const parsedURL = pathHash.slice(1);
    return parsedURL;
  }
}

export default HashRouter;
