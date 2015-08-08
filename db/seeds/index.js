import admin from './admin';
import groups from './groups';
import groupsPermissions  from './groups-permissions'
import permissions from './permissions';
import terms from './terms';
import models from '../../models';
models();

export default function() {
  permissions()
    .then(groups)
    .then(groupsPermissions)
    .then(terms)
    .then(admin);
}