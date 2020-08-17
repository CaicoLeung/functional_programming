const Identity = function (x) {
  this.__value = x
}

Identity.of = (x) => new Identity(x)

Identity.prototype.map = function (f) {
  return Identity.of(f(this.__value))
}

module.exports = {
  Identity
}
