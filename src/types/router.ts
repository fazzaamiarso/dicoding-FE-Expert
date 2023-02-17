export interface RouteDef {
  path: string;
  component?: string;
}

export interface RouteLocation {
  params: Record<string, string>;
}
