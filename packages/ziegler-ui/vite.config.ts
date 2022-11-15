/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      enableBuild: true,
    }),
    react({
      jsxRuntime: "automatic",
    }),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      logDiagnostics: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setup/global.ts"],
    testTimeout: 15000,
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ziegler-ui",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
