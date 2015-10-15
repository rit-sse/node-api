'use strict';
import models from '../../models';
import Membership from '../../models/membership';
import Officer  from '../../models/officer';
import Committee  from '../../models/committee';
import Event from '../../models/event';
import sequelize from '../../config/sequelize';
models();

export function up(queryInterface, Sequelize) {
  return Committee.findAll().then(committees => {
    const update = (table, model) => {
      return queryInterface.addColumn(
        table,
        'committeeName',
        {
          type: Sequelize.STRING,
          references: { model: 'committees', key: 'name' },
        })
        .then(() => {
          return Promise.all(committees.map(committee => {
            return model.update({
              committeeName: committee.name,
            }, {
              where: {
                committeeId: committee.id,
              },
            });
          }));
        }).then(() => {
          return queryInterface.removeColumn(
            table,
            'committeeId'
          );
        });
    };
    return sequelize.query('ALTER TABLE committees ADD CONSTRAINT committee_name_unique UNIQUE (name);')
    .then( () => {
      return Promise.all([
        update('memberships', Membership),
        update('officers', Officer),
        update('events', Event),
      ]);
    })
      .then(() => {
        return queryInterface.removeColumn(
          'committees',
          'id'
        );
      })
      .then(() => {
        return sequelize.query('ALTER TABLE committees ADD PRIMARY KEY (name)');
      });
  });

}

export function down(queryInterface) {

}
