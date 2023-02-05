import { RouteDef } from "@/types/router";

type TempAny = any;

class HashRouter {
  private _routes: RouteDef[];

  private _outlet: HTMLElement;

  private _params: Record<string, string>;

  private _routeMatchIdx: number;

  constructor({ routes, outlet }: { routes?: RouteDef[]; outlet: HTMLElement }) {
    this._routes = routes ?? [];
    this._outlet = outlet;

    if (this._routes.length) {
      this._init();
    }
  }

  static back() {
    window.history.back();
  }

  public render(pathName: string) {
    const parsedPath = this._removeHash(pathName);
    if (!this._checkRouteMatch(parsedPath)) return;

    const pageOutlet = this._routes[this._routeMatchIdx];
    const pageEl = document.createElement(pageOutlet.component) as TempAny;
    pageEl.location = { params: this._params };
    this._outlet.innerHTML = "";
    this._outlet.appendChild(pageEl);
  }

  private _init() {
    if (window === undefined)
      throw new Error("Router can't be initialized because there's no Window");

    ["DOMContentLoaded", "hashchange"].forEach((ev) => {
      window.addEventListener(ev, () => {
        const hashPath = window.location.hash || "#/";
        this.render(hashPath);
      });
    });
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

  private _removeHash(pathHash: string) {
    const parsedURL = pathHash.slice(1);
    return parsedURL;
  }

  public setRoutes(routes: RouteDef[]) {
    this._routes = routes;
    this._init();
    return this;
  }
}

export default HashRouter;
