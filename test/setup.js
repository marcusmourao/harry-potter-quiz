const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

require('jsdom-global')();

window.Date = Date;

global.expect = chai.expect;
global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};
