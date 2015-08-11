import nconf from '../config';
import User from '../models/user';

export default class SlackProvider {

  constructor(secret, dce) {
    this.dce = dce;
    this.authLevel = nconf.get('auth:levels:low');
    this.secret = secret;
  }

  verify() {
    return new Promise( (resolve, reject) => {
      var validDCE = this.dce.match(/[a-z]{2,3}\d{4}/);
      if (validDCE && this.secret === nconf.get('auth:slack:secret')){
        return resolve();
      } else {
        return reject({ message: 'Invalid secret or dce' });
      }
    });
  }

  findOrCreateUser() {
    return User.findOrCreate({ where: { dce: this.dce } } );
  }
};
