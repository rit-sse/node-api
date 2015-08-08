import Group from '../../models/group';

export default function seed() {
  return Group
    .destroy({where: { }})
    .then(() => {
      return Group.bulkCreate([{
        name: 'primary officers',
        description: 'the primary officers'
      },
      {
        name: 'officers',
        description: 'the officers'
      },
      {
        name: 'mentor',
        description: 'the mentors'
      }]);
    })
};
