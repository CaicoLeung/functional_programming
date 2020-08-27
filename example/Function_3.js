const {juxt, sum, length, partial, join, lift, pipeWith, negate, inc, isNil} = require('ramda')

const print = partial(console.log, [])

const log = (...args) => join(',', args)

print(juxt([Math.max, Math.min])(1, 2, 3, 4))
print(juxt([log, Math.max])(1, 2, 3, 4))

const madd3 = lift((a, b, c) => {
  console.log(a, b, c, a + b + c)
  return a + b + c
})
print(madd3([1, 2, 3], [4, 5, 6], [7]))
print(madd3([1,2,3], [1,2,3], [1])) // 3, 4, 5, 4, 5, 6, 5, 6, 7


const pipeWithNoNil = pipeWith((f, res) => {
  console.log(res, f(res))
  return isNil(res) ? res : f(res)
})

const fn = pipeWithNoNil([Math.pow, negate, inc])

print(fn(2, 3))
