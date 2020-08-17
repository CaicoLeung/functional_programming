const { Identity } = require('./Identity')
const { Maybe } = require('./maybe')
const { Left, Right } = require('../error_catch')
const E = require('./exercises')
const assert = require('chai').assert

describe('functor 练习', () => {
  it('Exericise 1 ', () => {
    assert.deepEqual(E.ex1(Identity.of(2)), Identity.of(3))
  });
  it('Exericise 2', () => {
    var xs = Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
    assert.deepEqual(E.ex2(xs), Identity.of('do'))
  });
  it('Exericise 3', function () {
    var user = { id: 2, name: "Albert" };
    assert.deepEqual(Maybe.of('A'), E.ex3(user));
  });
  it('Exercise 4', function(){
    assert.deepEqual(Maybe.of(4), E.ex4("4"));
  });
  it('Exercise 5', function(done){
    E.ex5(13).fork(console.log, function(res){
      assert.deepEqual('LOVE THEM FUTURES', res);
      done();
    })
  });
  it('Exercise 6', function(){
    assert.deepEqual(Left.of('Your account is not active'), E.ex6({active: false, name: 'Gary'}));
    assert.deepEqual(Right.of('Welcome Theresa'), E.ex6({active: true, name: 'Theresa'}));
  });
  it('Exercise 7', function(){
    assert.deepEqual(Right.of("fpguy99"), E.ex7("fpguy99"));
    assert.deepEqual(Left.of("You need > 3"), E.ex7("..."));
  });
})
