import {
  ascend,
  compose,
  concat,
  construct,
  constructN,
  converge,
  descend,
  divide,
  identity,
  invoker,
  join, juxt,
  length,
  map, max, min,
  prop,
  sort,
  sum,
  toLower,
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
