const _ = require('ramda')

const inspect = function(x) {
  return (x && x.inspect) ? x.inspect() : x;
};

// IO
const IO = function(f) {
  this.unsafePerformIO = f;
}

IO.of = function(x) {
  return new IO(function() {
    return x;
  });
}

IO.prototype.map = function(f) {
  return new IO(_.compose(f, this.unsafePerformIO));
}

IO.prototype.join = function() {
  return this.unsafePerformIO();
}

IO.prototype.chain = function(f) {
  return this.map(f).join();
}

IO.prototype.ap = function(a) {
  return this.chain(function(f) {
    return a.map(f);
  });
}

IO.prototype.inspect = function() {
  return 'IO('+inspect(this.unsafePerformIO)+')';
}

module.exports = {
  IO
}
