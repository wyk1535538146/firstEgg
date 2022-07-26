/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1658719741459_9913';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  config.security = {
    csrf :{
      enable:false,
    }
  }

  config.mongoose = {
    client:{
      url: 'mongodb://127.0.0.1/test',
      options:{}
    }
  }

  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};