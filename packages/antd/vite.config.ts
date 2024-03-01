import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // use this plugin with tsconfig paths to import workspace dependencies
    tsconfigPaths(),
    // @ts-expect-error error type
    svgr(),
  ],
  server: {
    open: true,
  },
});
