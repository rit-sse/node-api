import {randexp} from 'randexp';
import faker from 'faker';
import Member from '../../models/member';

export var seed = function(knex, Promise) {
  return knex('members')
    .del()
    .then(function(){
      var arr = []
      for(var i = 0; i < 50; i++) {
        arr.push(new Member({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          dce: randexp(/[a-z]{2,3}\d{4}/)
        }).save());
      }
      return arr;
    })
    .all();
};
