export default function scopify(query, ...params) {
  var scopes = [{
    method: ['paginate', query.perPage, query.page]
  }];
  for (let param of params) {
    if (query[param]){
      scopes.push({
        method: [param, query[param]]
      });
    }
  }
  return scopes;
}
