'use strict';

import admin from './admin';
import terms from './terms';
import models from '../../models';
import officer from './seed';
models();

export default function() {
  return terms()
    .then(admin)
    .then(officer);
}
