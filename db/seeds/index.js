import admin from './admin';
import officers  from './officers';
import terms from './terms';
import models from '../../models';
models();

export default function() {
  return officers()
    .then(terms)
    .then(admin);
}
