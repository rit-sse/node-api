export default function scopify(query, ...params) {
  const scopes = [{
    method: ['paginate', query.perPage, query.page],
  }];
  params.forEach((param) => {
    if (typeof query[param] !== 'undefined') {
      scopes.push({
        method: [param, query[param]],
      });
    }
  });
  return scopes;
}
