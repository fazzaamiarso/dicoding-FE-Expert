import { RouteDef } from "@/types/router";

type TempAny = any;

const routeChange = new CustomEvent("route-change", { bubbles: true });

class HistoryRouter {
  private _routes: RouteDef[];

  private _outlet: HTMLElement;

  private _paramsMap: Map<string, string> = new Map();

  private _routeMatchIdx: number = -1;

  private _activeRoute: string = "";

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
    if (!this._checkRouteMatch(pathName)) return;

    const pageOutlet = this._routes[this._routeMatchIdx];
    if (!pageOutlet.component) return;
    const pageEl = document.createElement(pageOutlet.component) as TempAny;
    this._activeRoute = pathName;
    const paramsFromMap = Object.fromEntries(this._paramsMap);
    pageEl.location = { params: paramsFromMap };
    this._outlet.innerHTML = "";
    this._outlet.appendChild(pageEl);
  }

  private _init() {
    if (window === undefined)
      throw new Error("Router can't be initialized because there's no Window");

    document.addEventListener("click", this._anchorClickHandler);

    ["DOMContentLoaded", "route-change", "popstate"].forEach((ev) => {
      window.addEventListener(ev, () => {
        const path = window.location.pathname || "/";
        // prevent unnecessary re-render
        if (this._activeRoute === path) return;
        this.render(path);
      });
    });
  }

  /**
   * Handle navigation triggered by anchor tag clicks
   */
  private _anchorClickHandler(e: Event) {
    const clickTarget = e.composedPath()[0];
    if (!(clickTarget instanceof HTMLAnchorElement)) return;
    if (clickTarget.href.includes("#")) return;
    if (clickTarget.getAttribute("target") === "_blank") return;
    e.preventDefault();
    e.stopPropagation();
    window.history.pushState({}, "", clickTarget.pathname);
    window.dispatchEvent(routeChange);
  }

  private _checkRouteMatch(path: string) {
    const isMatched = Boolean(this._matchRoute(path));
    return isMatched;
  }

  private _splitPathToSegment = (path: string) =>
    path
      .split("/")
      .slice(1)
      .filter((r) => r !== "");

  private _matchRoute(urlPath: string) {
    const matchedRouteIdx = this._routes.findIndex((route) => {
      const routeSegments = this._splitPathToSegment(route.path);
      const urlSegments = this._splitPathToSegment(urlPath);

      if (routeSegments.length !== urlSegments.length) return false;

      const isMatched = routeSegments.every((segment, idx) => {
        const isParam = segment.startsWith(":");
        const isPathMatch = segment === urlSegments[idx];
        return isPathMatch || isParam;
      });

      if (!isMatched) return false;

      routeSegments.forEach((segment, idx) => {
        if (segment.startsWith(":")) {
          this._paramsMap.set(segment.slice(1), urlSegments[idx]);
        }
      });

      return true;
    });

    this._routeMatchIdx = matchedRouteIdx;
    return matchedRouteIdx > -1;
  }

  public setRoutes(routes: RouteDef[]) {
    this._routes = routes;
    this._init();
    return this;
  }
}

export default HistoryRouter;
