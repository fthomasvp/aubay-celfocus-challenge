/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "src/setupTests.ts",
        "src/mocks/**",
        "src/**/*.{test,spec}.{tsx, jsx}",
        "src/utils/test-utils.tsx",
      ],
    },
  },
});
