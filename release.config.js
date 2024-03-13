/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  extends: 'semantic-release-monorepo',
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        pkgRoot: 'packages/antd',
        tarballDir: false,
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'dist/index.min.css', label: 'CSS distribution' },
          { path: 'dist/index.min.js', label: 'JS distribution' },
        ],
      },
    ],
  ],
};
