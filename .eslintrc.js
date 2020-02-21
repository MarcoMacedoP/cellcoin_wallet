module.exports = {
  root: true,
  extends: '@react-native-community',
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.tsx', 'ts', '.android.js', '.ios.js', '.web.js'],
      },
      map: ['app', './src'],
    },
  },
};
