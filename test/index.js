/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback  */

import { beforeHelper, beforeEachHelper } from './helpers';

before(function () {
  return beforeHelper();
});

beforeEach(function () {
  return beforeEachHelper();
});
