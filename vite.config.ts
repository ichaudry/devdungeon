import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@game": path.resolve(__dirname, "./src/game"),
      "@ui": path.resolve(__dirname, "./src/ui"),
      "@systems": path.resolve(
        __dirname,
        "./src/systems"
      ),
      "@entities": path.resolve(
        __dirname,
        "./src/entities"
      )
    }
  }
});