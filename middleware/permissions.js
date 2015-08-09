import User from '../models/user';

export function needs(permission) {
  return (req, res, next) => {
    User
      .findById(req.auth.user.id)
      .then((user) => user.can(permission, req.auth.level))
      .then(() => next())
      .catch((err) => next({message: `User does not have permission: ${permission}`, status: 403}))
  }
}

export function needsIndex(permission) {
  return (req, res, next) => {
    req.query.approved = req.query.approved === 'false' ? false : true;
    if(req.query.approved) {
      next()
    } else {
      User
        .findById(req.auth.user.id)
        .then((user) => user.can(`read unapproved ${permission}`, req.auth.level))
        .then(() => next())
        .catch(() => next({message: `User does not have permission: read unapproved ${permission}`, status: 403}))
    }
  }
}

export function needsOne(permission) {
  return (req, res, next) => {
    User
      .findById(req.auth.user.id)
      .then((user) => user.can(`read unapproved ${permission}`, req.auth.level))
      .then(() => {
        req.auth.allowed = true;
        next();
      })
      .catch(() => next())
  }
}