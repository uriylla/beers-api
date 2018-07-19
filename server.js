const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Beer} = require('./models/beer');

var app = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.get('/beers', (req, res) => {
  var dateStartId = objectIdWithTimestamp(req.query.dateStart);
  var dateEndId = objectIdWithTimestamp(req.query.dateEnd);
  var params = {
    '_winner': req.query.winner,
    '_loser': req.query.loser,
    'amount': req.query.amount
  }
  params._id = dateStartId && dateEndId ? { $gt: dateStartId, $lt: dateEndId } : undefined;
  Object.keys(params).forEach(key => params[key] === undefined ? delete params[key] : '');
  Beer.find(params).then((beers) => {
    res.send({beers});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/beers/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Beer.findById(id).then((beer) => {
    if (!beer) {
      return res.status(404).send();
    }
    res.send({beer});
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

var objectIdWithTimestamp = function (timestamp) {
  if(!timestamp) return undefined;
  if (typeof(timestamp) == 'string') {
      timestamp = new Date(timestamp);
  }

  var hexSeconds = Math.floor(timestamp/1000).toString(16);
  console.log(hexSeconds);
  var constructedObjectId = new ObjectID(hexSeconds + "0000000000000000");

  return constructedObjectId
}

module.exports = {app};