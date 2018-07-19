const {Beer} = require('../../models/beer');
const beers = [];

const populateBeers = (done) => {
  Beer.remove({}).then(() => done());
};

module.exports = {beers, populateBeers};
