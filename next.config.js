const path = require('path');

module.exports = {
  basePath: '/linkedin-redesign-app',
  assetPrefix: '/linkedin-redesign-app/',
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
    ],
  },
  images: {
    domains: [
      'i.pravatar.cc',
      'media-exp1.licdn.com',
      'linkedinconcept.s3.amazonaws.com',
    ],
    loader: 'imgix',
  },
};
