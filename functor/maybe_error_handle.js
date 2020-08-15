const {curry, isNil, prop, compose, subtract} = require('ramda')

const Maybe = function(x) {
  this.__value = x
}

Maybe.of = (x) => new Maybe(x)

const maybe = curry((x, f, m) => isNil(x) ? x : f(prop('__value', m)))

const finishTransaction = console.log;

const withdraw = curry((amount, account) => prop('balance', account) >= amount ? Maybe.of({ balance: account.balance - amount }) : Maybe.of(null))

const getTwenty = compose(maybe('你超支了!', finishTransaction), withdraw(20))

getTwenty({ balance: 200 })