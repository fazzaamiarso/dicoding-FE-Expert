/* eslint-disable no-console */
import { Workbox } from "workbox-window";

export const registerSW = () => {
  // Don't run on development mode since it causes SW to be called multiple times on watch mode.
  if (process.env.NODE_ENV === "development") return;
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", async () => {
    const wb = new Workbox("/sw.bundle.js");
    try {
      await wb.register();
      console.log("Service worker registered");
    } catch (error) {
      console.log("Failed to register service worker", error);
    }
  });
};
