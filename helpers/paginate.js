import nconf from '../config';

var defaultPerPage = nconf.get('pagination:perPage');

export default function(query, perPage, page)  {
  perPage = perPage || defaultPerPage
  page = page || 1;
  return Promise.all([
    this.query(qb => qb.where(query).count('* as count')).fetch(),
    this.collection().query(qb => {
      qb
        .where(query)
        .limit(perPage)
        .offset((page-1)*perPage)
    })
    .fetch()
  ])
    .then((res) => {
      var total = res[0].attributes.count;
      var data = res[1];

      return {
        total: total,
        perPage: perPage,
        currentPage: page,
        data: data
      }
    });
}