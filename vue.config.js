const { mocker } = require('http-mockjs');

module.exports = {
  devServer: {
    before: (app) => {
      mocker(app);
    },
  },
  lintOnSave: false,
};
