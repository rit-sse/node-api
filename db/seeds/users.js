import {randexp} from 'randexp';
import faker from 'faker';
import User from '../../models/user';

export default function seed() {
  return User
    .destroy({where: { }})
    .then(function(){
      var arr = []
      for(var i = 0; i < 50; i++) {
        arr.push({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          dce: randexp(/[a-z]{2,3}\d{4}/)
        });
      }
      return User.bulkCreate(arr);
    })
};
