import Promise from 'bluebird';
import quotes from './quotes.json';
import Tag from './models/tag';
import Quote from './models/quote';
import './models';

Promise.each(quotes, (quoteObj) => {
  quoteObj.approved = true;
  return Quote
    .create(quoteObj)
    .then((quote) => {
      const arr = [quote];
      quoteObj.tags.forEach((tag) => {
        arr.push(Tag.findOrCreate({ where: { name: tag } }));
      });
      return arr;
    })
    .spread((quote, ...tags) => [quote, quote.setTags(tags.map(tag => tag[0]))])
    .catch(err => console.log(err)); // eslint-disable-line no-console
})
  .then(() => console.log('done')); // eslint-disable-line no-console
