import path from 'path';

import { defineConfig } from 'rspress/config';
import { pluginPlayground } from '@rspress/plugin-playground';

export default defineConfig({
  lang: 'zh',
  base: '/react-filter-component/',
  root: path.join(__dirname, 'docs'),
  outDir: 'dist',
  title: 'react filter',
  description: 'react filter docs',
  icon: '/react-filter.png',
  logo: {
    light: '/react-filter.png',
    dark: '/react-filter.png',
  },
  themeConfig: {
    enableScrollToTop: true,
    socialLinks: [{ icon: 'github', mode: 'link', content: 'https://github.com/wood3n/react-filter-component' }],
    footer: {
      message: 'react filter component',
    },
    locales: [
      {
        lang: 'en',
        label: 'English',
        title: 'react filter component introduction',
        description: 'react filter component docs',
        outlineTitle: 'TOC',
        searchPlaceholderText: 'search',
        prevPageText: 'Previous page',
        nextPageText: 'Next page',
      },
      {
        lang: 'zh',
        label: '中文',
        title: 'react filter 组件介绍',
        description: 'react-filter组件使用介绍',
        outlineTitle: '目录',
        searchPlaceholderText: '搜索',
        prevPageText: '上一页',
        nextPageText: '下一页',
      },
    ],
  },
  plugins: [pluginPlayground()],
  locales: [
    {
      lang: 'en',
      // 导航栏切换语言的标签
      label: 'English',
    },
    {
      lang: 'zh',
      // 导航栏切换语言的标签
      label: '简体中文',
    },
  ],
});
