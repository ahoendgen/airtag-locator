const atomicGenerator =
  require("@a9g/plop-generator-react-atomic-component").default;

const defaultConfig = {
  createIndex: true,
  functional: true,
  basePath: "./src/components",
  withClassnameInterfaceImportPath: "@framework/ui", //make sure to configure this path
  withStyleInterfaceImportPath: "@framework/ui",
  tests: false,
  stories: false,
  styledComponents: false,
  useNative: false,
  useMacro: false,
};

const config = (plop) => {
  atomicGenerator(plop, defaultConfig);
};

module.exports = config;
