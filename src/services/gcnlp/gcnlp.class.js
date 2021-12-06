const logger = require('../../logger');

/* eslint-disable no-unused-vars */
exports.Gcnlp = class Gcnlp {
  constructor (options, app) {
    this.gcnlpClient = app.get('gcnlpClient');
  }

  async analyzeSentiment (data) {
    return await this.gcnlpClient.analyzeSentiment(data);
  }

  async find (data) {
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    const {content, type} = data;
    const document = {
      content,
      type
    };
    try{
      const [sentimentResult] = await this.gcnlpClient.analyzeSentiment({document});
    } catch (error) {
      logger.info(error);
    }

    return sentimentResult;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
