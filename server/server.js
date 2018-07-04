const express = require('express');
const fs = require('fs');
const beersRepository = require('./beersRepository');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var checkBeersFile = () => {
  fs.access(__dirname + '/beers.json', fs.constants.F_OK, (err) => {
    err && fs.writeFileSync(__dirname + '/beers.json', '[]');
  });
}

checkBeersFile();

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
  var removed = beersRepository.removeBeer(id);
  res.send({removed});
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Started up at port ${process.env.PORT || 8080}`);
});