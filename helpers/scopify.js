export default function scopify(query, ...params) {
  const scopes = [{
    method: ['paginate', query.perPage, query.page],
  }];
  if (query.orderBy) {
    scopes.push({
      method: ['orderBy', query.orderBy, query.direction],
    });
    delete query.orderBy;
    delete query.direction;
  }
  params.forEach((param) => {
    if (typeof query[param] !== 'undefined') {
      scopes.push({
        method: [param, query[param]],
      });
    }
  });
  return scopes;
}
