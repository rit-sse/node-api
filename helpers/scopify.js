'use strict';

export default function scopify(query, ...params) {
  const scopes = [{
    method: ['paginate', query.perPage, query.page],
  }];
  for (const param of params) {
    if (query[param]) {
      scopes.push({
        method: [param, query[param]],
      });
    }
  }
  return scopes;
}
