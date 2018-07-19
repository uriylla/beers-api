const expect = require('expect');
const request = require('supertest');

const {beers, populateBeers} = require('./seed/seed');

const {app} = require('./../server');
const {Beer} = require('./../models/beer');

// beforeEach(populateBeers);


describe('POST /beers', () => {
  it('should create a new Beer', (done) => {
    var amount = 2;
    request(app)
      .post('/beers')
      .send({amount})
      .expect(200)
      .expect((res) => {
        expect(res.body.amount).toBe(amount)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Beer.find().then((beers) => {
          expect(beers.length).toBe(1);
          expect(beers[0].amount).toBe(amount);
          done();
        }).catch((e) => done(e));
      });
  }).timeout(0);
});