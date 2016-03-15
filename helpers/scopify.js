export default function scopify(query, ...params) {
  const scopes = [{
    method: ['paginate', query.perPage, query.page],
  }];
  for (const param of params) {
    if (typeof query[param] !== 'undefined') {
      scopes.push({
        method: [param, query[param]],
      });
    }
  }
  return scopes;
}
