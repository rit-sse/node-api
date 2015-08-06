import nconf from '../config';

var defaultPerPage = nconf.get('pagination:perPage');

export function scope(perPage, page) {
  return {
    limit: perPage,
    offset: (page-1)*perPage
  }
}

export function paginate(query, perPage, page) {
  perPage = perPage || defaultPerPage
  page = page || 1;
  return Promise.all([
    query.count(),
    query.scope({method: ['paginate', perPage, page]}).findAll()
  ])
    .then((res) => {
      var total = res[0];
      var data = res[1];

      return {
        total,
        perPage,
        currentPage: page,
        data
      };
    });
}