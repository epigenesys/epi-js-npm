module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          useBuiltIns: 'entry',
          corejs: 3,
          exclude: ['transform-typeof-symbol']
        }
      ]
    ],
    plugins: [
      "@babel/plugin-transform-modules-commonjs",
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-async-to-generator',
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ]
  }
}
