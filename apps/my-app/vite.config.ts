/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: false,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__test__/setup/global.ts'],
    testTimeout: 5000,
    includeSource: ['src/**/*.{js,ts,tsx,jsx}'],
  },
  define: {
    'import.meta.vitest': false,
  },
});
