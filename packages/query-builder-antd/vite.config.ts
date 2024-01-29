import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from '@svgr/rollup';

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
