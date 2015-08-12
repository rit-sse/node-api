import User from '../models/user';

export function needs(endpoint, action) {
  return (req, res, next) => {
    User
      .findById(req.auth.user.id)
      .then(user => user.can(endpoint, action, req.auth.level))
      .then(() => next())
      .catch(() => next({
        message: `User does not have permission: ${action} ${endpoint}`,
        status: 403
      }));
  };
}

export function needsApprovedIndex(endpoint) {
  return (req, res, next) => {
    req.query.approved = req.query.approved === 'false' ? false : true;
    if (req.query.approved) {
      next();
    } else if (!req.auth) {
      next({
        message: `User does not have permission: unapproved ${endpoint}`,
        status: 403
      });
    } else {
      User
        .findById(req.auth.user.id)
        .then(user => user.can(endpoint, 'unapproved', req.auth.level))
        .then(() => next())
        .catch(err => {
          next({
            message: `User does not have permission: unapproved ${endpoint}`,
            status: 403
          });
        });
    }
  };
}

export function needsApprovedOne(endpoint) {
  return (req, res, next) => {
    User
      .findById(req.auth.user.id)
      .then(user => user.can(endpoint, 'unapproved', req.auth.level))
      .then(() => {
        req.auth.allowed = true;
        next();
      })
      .catch(() => next());
  };
}
