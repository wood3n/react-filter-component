import path from 'path';

import { defineConfig } from 'rspress/config';
import { pluginPlayground } from '@rspress/plugin-playground';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'react-filter',
  description: 'react-filter docs',
  icon: '/react-filter.png',
  logo: {
    light: '/react-filter.png',
    dark: '/react-filter.png',
  },
  themeConfig: {
    socialLinks: [{ icon: 'github', mode: 'link', content: 'https://github.com/wood3n/react-filter-component' }],
  },
  plugins: [pluginPlayground()],
});
