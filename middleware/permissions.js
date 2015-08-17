'use strict';

import User from '../models/user';

export function needs(endpoint, action) {
  return (req, res, next) => {
    User
      .findById(req.auth.user.dce)
      .then(user => user.can(endpoint, action, req.auth.level))
      .then(() => next())
      .catch(() => next({
        message: `User does not have permission: ${action} ${endpoint}`,
        status: 403,
      }));
  };
}

// Checks if a user has permission to view unapproved resources but only if it
// is part of the query
export function needsApprovedIndex(endpoint) {
  return (req, res, next) => {
    req.query.approved = !(req.query.approved === 'false');
    if (req.query.approved) {
      return next();
    } else if (!req.auth) {
      return next({
        message: `User does not have permission: unapproved ${endpoint}`,
        status: 403,
      });
    }
    User
      .findById(req.auth.user.dce)
      .then(user => user.can(endpoint, 'unapproved', req.auth.level))
      .then(() => next())
      .catch(() => {
        next({
          message: `User does not have permission: unapproved ${endpoint}`,
          status: 403,
        });
      });
  };
}

export function needsApprovedOne(endpoint) {
  return (req, res, next) => {
    User
      .findById(req.auth.user.dce)
      .then(user => user.can(endpoint, 'unapproved', req.auth.level))
      .then(() => {
        req.auth.allowed = true;
        next();
      })
      .catch(() => next());
  };
}
