const { authenticate } = require('@feathersjs/authentication').hooks;

const analyzeSentiment = require('../../hooks/analyze-sentiment');

module.exports = {
  before: {
    all: [analyzeSentiment()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [analyzeSentiment()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [analyzeSentiment()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
