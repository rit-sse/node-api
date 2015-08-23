'use strict';

import Term from '../../models/term';

export default function seed() {
  return Term
    .create({
      name: '2151',
      startDate: new Date(2015, 7, 22),
      endDate: new Date(2015, 11, 18),
    });
}
