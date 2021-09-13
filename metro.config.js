// This file was generated by wix-one-app-engine on Mon Sep 13 2021
// You can extend it if you want, but leave the defaults to be required from the engine config

const {merge} = require('lodash');
const baseConfig = require('./node_modules/wix-one-app-engine/tools/engine_cli/etc/metro.config');
let svgConfig;

module.exports = (async () => {
  if (!svgConfig) {
    svgConfig = await require('./node_modules/wix-one-app-engine/tools/engine_cli/etc/svg.metro.config');
  }

  return merge(svgConfig, baseConfig);
})();
