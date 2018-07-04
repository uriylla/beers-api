var removeBeer = (id) => {
  var beers = JSON.parse(fs.readFileSync(__dirname + '/beers.json'));
  var toRemove = beers.find((beer) => beer.id === id);
  var filtered = beers.filter((beer) => beer.id !== id);
  fs.writeFileSync(__dirname + '/beers.json', JSON.stringify(filtered, undefined, 2));
  return toRemove;
}

module.exports = {
  removeBeer
}