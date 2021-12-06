const assert = require('assert');
const app = require('../../src/app');

describe('\'gcnlp\' service', () => {
  it('registered the service', () => {
    const service = app.service('gcnlp');

    assert.ok(service, 'Registered the service');
  });
});
