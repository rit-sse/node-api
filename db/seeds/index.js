'use strict';

import admin from './admin';
import terms from './terms';
import models from '../../models';
models();

export default function() {
  return terms()
    .then(admin);
}
