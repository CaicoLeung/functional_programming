const { curry, compose, prop } = require('ramda')
const moment = require('moment')

const Left = function(x) {
  this.__value = x
}

Left.of = (x) => new Left(x)

Left.prototype.map = function (f) {
  return this
}

const Right = function (x) {
  this.__value = x
}

Right.of = (x) => new Right(x)

Right.prototype.map = function (f) {
  return Right.of(f(this.__value))
}

Right.of('rain').map((str) => 'b' + str).map(console.log)

Left.of('rain').map((str) => 'b' + str).map(console.log)

Right.of({host: 'localhost', port: 80}).map(prop('host')).map(console.log)

Left.of('rolls eyes...').map(prop('host')).map(console.log)

const getAge = curry((now, user) => {
  const birthdate = moment(prop('birthdate', user), 'YYYY-MM-DD')
  if(!birthdate.isValid()) {
    return Left.of("Birth date could not be parsed");
  }
  return Right.of(now.diff(birthdate, 'years'));
})

const a = getAge(moment(), { birthdate: '1993-05-01' })
console.log(a)

const b = getAge(moment(), { birthdate: 'balloons!' })
console.log(b)

const c = getAge(moment(), 'boom!')
console.log(c)

/* Either */
const either = curry((f, g, e) => {
  switch (e.constructor) {
    case Left:
      return f(prop('__value', e))
    case Right:
      return g(prop('__value', e))
    default:
      throw TypeError('the type of e is not one of Left and Right')
  }
})

const zoltar = compose(console.log, either(Left.of, Right.of), getAge(moment()))

zoltar({ birthdate: '1993-05-01' })
zoltar({ birthdate: 'boom!' })
