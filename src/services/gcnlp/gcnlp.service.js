// Initializes the `gcnlp` service on path `/gcnlp`
const { Gcnlp } = require('./gcnlp.class');
const hooks = require('./gcnlp.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gcnlp', new Gcnlp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gcnlp');

  service.hooks(hooks);
};
