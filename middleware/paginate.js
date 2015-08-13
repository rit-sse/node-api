import nconf from '../config';

var defaultPerPage = nconf.get('pagination:perPage');

export default function(req, res, next) {
  req.query.perPage = req.query.perPage || defaultPerPage;
  req.query.page = req.query.page || 1;
  next();
}
