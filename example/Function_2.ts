import {
  ascend,
  compose,
  concat,
  construct,
  constructN,
  converge,
  dec,
  descend,
  divide,
  identity,
  inc,
  invoker,
  isNil,
  join, juxt,
  length,
  map, max, memoizeWith, merge, mergeAll, mergeDeepWith, min,
  nAry,
  negate,
  o, of, once,
  pipeWith,
  product,
  prop,
  range,
  sort,
  sum,
  toLower,
  toString,
  toUpper
} from 'ramda'
import { print } from './Unit'

function Animal(kind) {
  this.kind = kind
}

Animal.prototype.sighting = function () {
  return `It's a ${this.kind}!`
}

// 将构造函数封装进柯里化函数，新函数与原构造函数的传入参数类型及返回值类型相同。
const AnimalConstruct = construct(Animal)

const animalTypes = ["Lion", "Tiger", "Bear"];
const animalSighting = invoker(0, 'sighting')
const sightNewAnimal = compose(animalSighting, AnimalConstruct)
print(map(sightNewAnimal, animalTypes))

function Salad() {
  this.ingredients = arguments
}

Salad.prototype.recipe = function () {
  const instructions = map(insredient => `Add a dollop of ${insredient}`, this.ingredients)
  return join('\n', instructions)
}

const ThreeLayerSalad: any = constructN(3, Salad)
// const salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup')
const salad = ThreeLayerSalad('Mayonnaise', 'Potato Chips', 'Ketchup')
print(salad.recipe())

const average = converge(divide, [sum, length])
print(average([1, 2, 3, 4 ,5 ,6, 7, 8]))

const strangeConcat = converge(concat, [toUpper, toLower])
print(strangeConcat('Caico Leung'))

const people = [
  { name: 'Emma', age: 70 },
  { name: 'Peter', age: 78 },
  { name: 'Mikhail', age: 62 },
]

print(sort(descend(prop('age')), people))
print(sort(descend(identity), [5, 3, 1, 6, 4]))
print(sort(ascend(identity), [5, 3, 1, 6, 4]))

let count = 0
const factorial = memoizeWith(s => toString(s), n => {
  count += 1
  return product(range(1, n + 1))
})

print(factorial(5))
print(factorial(6))
print(factorial(6))
print(factorial(5))

print('count: ', count)

print(merge({name: 'caico', age: 15}, {age: 20}))
print(mergeAll([{a: 1}, {b: 2}, {c: 3}]))
print(mergeDeepWith(concat, {a: 'hi', b: 'hello', c: [1, 2, 3]}, { b: 'world', c: [15, 6, 7], d: 1 }))

const takesTwoArgs = (a, b) => [a, b]
print(takesTwoArgs.length)
print(takesTwoArgs(1, 2))

const takeOneArg = nAry(1, takesTwoArgs)
print(takeOneArg.length)
print(takeOneArg(1, 2))


const classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
const yellGreeting = o(toUpper, classyGreeting)
print(yellGreeting({ first: 'caico', last: 'leung' }))

print(of(1), Array.of(1, 2, 3))

const addTenOnce = once(n => n + 10)
print(addTenOnce(1))
print(addTenOnce(100))