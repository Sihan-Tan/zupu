module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-classes',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
