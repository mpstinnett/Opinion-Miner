const gcnlp = require('@google-cloud/language');
const gcnlpClient = new gcnlp.LanguageServiceClient();

module.exports = function (app) {
  app.set('gcnlpClient', gcnlpClient);
};
