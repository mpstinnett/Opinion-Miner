const users = require('./users/users.service.js');
const gcnlp = require('./gcnlp/gcnlp.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(gcnlp);
};
