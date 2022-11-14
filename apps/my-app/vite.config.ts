/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
const noop = () => {};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__test__/setup/global.ts"],
    testTimeout: 5000,
    includeSource: ["src/**/*.{js,ts,tsx,jsx}"],

    // reporters: ['json' ],
    logHeapUsage: true,
    benchmark: {
      outputFile: "./bench.json",
      reporters: ["json", "default"],
    },
  },
  server: {
    port: 3000,
    host: "app.react.local",
  },

  define: {
    "import.meta.vitest": true,
  },
});
