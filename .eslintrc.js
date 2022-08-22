module.exports = {
  extends: 'next',
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  ignorePatterns: [
    '!**/*',
    'node_modules/*',
    'generated/*',
    'ios/*',
    'android/*',
  ],
  root: true,
}
