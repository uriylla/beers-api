const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/beers', (req, res) => {
  var beers = fs.readFileSync(__dirname + '/beers.json');
  res.send(beers);
});

app.post('/beers', (req, res) => {
  var beers = JSON.parse(fs.readFileSync(__dirname + '/beers.json'));
  beers.push(req.body);
  fs.writeFileSync(__dirname + '/beers.json', JSON.stringify(beers, undefined, 2));
  res.send(req.body);
});

app.delete('/beers/:id', (req, res) => {
  var id = parseInt(req.params.id);
  var removed = removeBeer(id);
  res.send({removed});
});

var removeBeer = (id) => {
  var beers = JSON.parse(fs.readFileSync(__dirname + '/beers.json'));
  var toRemove = beers.find((beer) => beer.id === id);
  var filtered = beers.filter((beer) => beer.id !== id);
  fs.writeFileSync(__dirname + '/beers.json', JSON.stringify(filtered, undefined, 2));
  return toRemove;
}

app.listen(8000, () => {
  console.log(`Started up at port 8000`);
});