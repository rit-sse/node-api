export default function scopify(query, ...params) {
  var scopes = [[], []]; // Because Model.scope() mutates the scope array
  for (let param of params) {
    if (query[param]){
      scopes[0].push({
        method: [param, query[param]]
      });
      scopes[1].push({
        method: [param, query[param]]
      });
    }
  }
  return scopes;
}
