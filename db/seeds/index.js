import admin from './admin';
import officer from './seed';
import '../../models';

export default function () {
  return admin()
    .then(officer);
}
