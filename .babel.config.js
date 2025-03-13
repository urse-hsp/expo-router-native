{
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel', ["import", { libraryName: "@ant-design/react-native" }]],
      },
    },
  };
};