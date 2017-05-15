import nconf from '../config';

const defaultPerPage = nconf.get('pagination:perPage');

export default function (req, res, next) {
  req.query.perPage = parseInt(req.query.perPage, 10) || defaultPerPage;
  req.query.page = parseInt(req.query.page, 10) || 1;
  next();
}
