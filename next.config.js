const path = require('path');

module.exports = {
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
