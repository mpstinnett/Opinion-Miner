const { Service } = require('feathers-mongodb');

exports.Users = class Users extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('users');
    });
  }

  create (data, params) {
    const {fullname, username, email, phonenumber, password} = data;
    const userData = {
      fullname,
      username,
      email,
      phonenumber,
      password
    };


    return super.create(userData, params);
  }

};
