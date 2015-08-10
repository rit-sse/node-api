import Term from '../../models/term';

export default function seed() {
  return Term
    .create({
      name: '2151',
      startDate: new Date(),
      endDate: new Date(2015, 12, 18)
    });
}
