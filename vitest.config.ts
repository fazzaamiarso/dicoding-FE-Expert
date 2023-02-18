import path from "path";
import { defineConfig } from "vitest/config";
import "fake-indexeddb/auto";

export default defineConfig({
  test: {
    include: ["src/__test__/*"],
    setupFiles: ["fake-indexeddb/auto"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
