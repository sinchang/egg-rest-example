'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1490750627161_5967';

  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.rest = {
    urlprefix: '/api/v1', // Prefix of rest api url. Default to /api/
    authRequest: null,
    authIgnores: null,
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
  };

  return config;
};

