const {curry, compose, concat, prop} = require('ramda')

const Container = function(x) {
  this.__value = x
}

Container.of = (x) => new Container(x)

Container.prototype.map = function(f) {
  return Container.of(f(this.__value))
}

console.log(Container.of(2).map(s => s * 2));
console.log(Container.of('caico leung').map(s => s.toUpperCase()));
console.log(Container.of('bombs').map(concat(' away')).map(prop('length')));