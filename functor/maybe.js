const { match, prop, add } = require('ramda')

const Maybe = function (x) {
  this.__value = x
}

Maybe.of = function (x) {
  return new Maybe(x)
}

Maybe.prototype.isNothing = function () {
  return (this.__value === null || this.__value === undefined)
}

Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}

Maybe.prototype.join = function() {
  return this.isNothing() ? Maybe.of(null) : this.__value;
}

Maybe.prototype.chain = function(f) {
  return this.map(f).join();
}

Maybe.prototype.ap = function(other) {
  return this.isNothing() ? Maybe.of(null) : other.map(this.__value);
}


const a = Maybe.of('Malkovich Malkovich').map(match(/a/ig))
console.log(a);

const b = Maybe.of(null).map(/a/ig)
console.log(b);

const c = Maybe.of({ name: 'Caico' }).map(prop('age')).map(add(10))
console.log(c);

const d = Maybe.of({ name: 'Caico', age: 25 }).map(prop('age')).map(add(10))
console.log(d);

module.exports = {
  Maybe
}
