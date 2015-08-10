import nconf from '../config';
import Promise from 'bluebird';

var defaultPerPage = nconf.get('pagination:perPage');

export function paginateScope(perPage, page) {
  return {
    limit: perPage,
    offset: (page-1)*perPage
  };
}

export function paginate(scopes, perPage, page) {
  perPage = perPage || defaultPerPage;
  page = page || 1;
  var count = this.scope(scopes[0]).count();
  scopes[1].push({method: ['paginate', perPage, page]});
  var query = this.scope(scopes[1]).findAll();
  return Promise.all([count, query])
    .spread((total, data) => {
      return {
        total,
        perPage,
        currentPage: page,
        data
      };
    });
}
