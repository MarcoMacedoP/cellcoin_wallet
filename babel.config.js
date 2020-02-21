module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.ts',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          screens: './src/screens',
          shared: './src/shared',
          assets: './src/assets',
        },
      },
    ],
  ],
};
