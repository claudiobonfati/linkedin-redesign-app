const path = require('path');

module.exports = {
  basePath: '/linkedin-redesign-app',
  assetPrefix: '/linkedin-redesign-app/',
  env: {
    BASE_PATH: '/linkedin-redesign-app',
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
    ],
  },
  images: {
    domains: [
      'media-exp1.licdn.com', 
      'linkedinconcept.s3.amazonaws.com',
    ],
  },
};
