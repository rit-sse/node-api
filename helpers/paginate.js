'use strict';

export default function(perPage, page) {
  return {
    limit: perPage,
    offset: (page-1)*perPage,
  };
}
