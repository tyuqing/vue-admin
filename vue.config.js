const { mocker } = require('http-mockjs');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/styles/variables.scss";',
      },
    },
  },
  devServer: {
    before: (app) => {
      mocker(app);
    },
  },
  lintOnSave: false,
};
