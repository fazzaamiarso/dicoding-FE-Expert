import { Workbox } from "workbox-window";

export const registerSW = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      const wb = new Workbox("/sw.bundle.js");
      try {
        await wb.register();
        console.log("Service worker registered");
      } catch (error) {
        console.log("Failed to register service worker", error);
      }
    });
  }
};
