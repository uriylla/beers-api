const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Beer} = require('./models/beer');

var app = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.get('/beers', (req, res) => {
  Beer.find().then((beers) => {
    res.send({beers});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/beers', (req, res) => {
  var beer = new Beer({
    amount: req.body.amount,
    _winner: new ObjectID(),
    _loser: new ObjectID()
  });

  beer.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.delete('/beers/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Beer.findOneAndRemove({
    _id: id,
  }).then((beer) => {
    if (!beer) {
      return res.status(404).send();
    }

    res.send({beer});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};