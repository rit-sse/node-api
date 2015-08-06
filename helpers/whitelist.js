export default function whitelist(query, ...params) {
  var newQuery = {}
  for(let param of params) {
    if(query[param]){
      newQuery[param] = query[param];
    }
  }
  return newQuery;
}