import admin from './admin';
import groupsPermissions  from './groups-permissions';
import permissions from './permissions';
import terms from './terms';
import models from '../../models';
models();

export default function() {
  return permissions()
    .then(groupsPermissions)
    .then(terms)
    .then(admin);
}
