const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')
  
module.exports = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    const isProd = phase === PHASE_PRODUCTION_BUILD 
    const env = {
      URL_BASE: (() => {
        if (isDev) return 'http://localhost:3000/'
        if (isProd) return 'https://test-magoya.now.sh/' // the production domain would go here
      })(),
    }
    
    const serverRuntimeConfig = {
      PROJECT_ROOT: __dirname,
    }
    // next.config.js object
    return {
      env,
      serverRuntimeConfig,
    }
  }


/*module.exports = {
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
};*/
