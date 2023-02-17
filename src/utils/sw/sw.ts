import { googleFontsCache, imageCache, staticResourceCache } from "workbox-recipes";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim, skipWaiting } from "workbox-core";
import { restaurantAPIConfig } from "@/constants";

skipWaiting();
clientsClaim();

// @ts-ignore
// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

googleFontsCache();
staticResourceCache();
imageCache();

registerRoute(
  ({ url }) => url.origin === restaurantAPIConfig.BASE_URL && url.pathname.startsWith("/detail/"),
  new StaleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
