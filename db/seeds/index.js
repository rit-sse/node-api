import admin from './admin';
import models from '../../models';
import officer from './seed';

models();

export default function () {
  return admin()
    .then(officer);
}
