'use strict';

import quotes from './quotes.json';
import Promise from 'bluebird';
import models from './models';
import Tag from './models/tag';
import Quote from './models/quote';

models();

Promise.each(quotes, quoteObj => {
  quoteObj.approved = true;
  return Quote
    .create(quoteObj)
    .then(quote => {
      const arr = [quote];
      for (const tag of quoteObj.tags) {
        arr.push(Tag.findOrCreate({ where: { name: tag } }));
      }
      return arr;
    })
    .spread((quote, ...tags) => [quote, quote.setTags(tags.map(tag => tag[0]))])
    .catch((err) => console.log(err));
})
  .then(() => console.log('done'));
