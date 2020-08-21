import {
  __,
  add,
  complement,
  concat,
  dissoc,
  dissocPath,
  divide,
  eqProps, equals,
  evolve, filter,
  forEachObjIndexed, gt, has, hasIn, hasPath,
  invert, invertObj, keys, keysIn, lens, lt, mapObjIndexed, merge, mergeAll, multiply, objOf, omit, over,
  partial, path, pathOr, paths, pick, pickAll,
  project, prop, propEq, set, toPairs, toPairsIn, toUpper,
  trim, values, valuesIn, view, where, whereEq
} from 'ramda'

const print = partial(console.log, [])

const target = {
  a: 1,
  b: 2,
  c: 3
}

const target_2 = {
  a: 10,
  b: 2,
  c: 90
}

const target_dissoced = dissoc('a', target)

partial(console.log, [target_dissoced])('')

const target_disscopath = dissocPath(['a'], target)

partial(console.log, [target_disscopath])('')

partial(console.log, [divide(100, 10)])('')

partial(console.log, [eqProps('a', target, target_2), eqProps('b', target_dissoced, target_disscopath)])('')

const tomato = {
  firstName: '  Tomato  ',
  data: {
    elapsed: 100,
    remaining: 1400
  },
  id: 123
}

const transformations = {
  firstName: trim,
  lastName: trim,
  data: {
    elapsed: add(101),
    remaining: add(-100)
  }
}

partial(console.log, [evolve(transformations, tomato)])('')

const logKV = (v, k) => console.log(`${k}: ${v}`)
forEachObjIndexed(logKV, tomato)

partial(console.log, [has('firstName', tomato), has('lastName', tomato)])('')

function Rectangle(width, height) {
  this.width = width
  this.height = height
}

Rectangle.prototype.area = function () {
  return multiply(this.width, this.height)
}

const square = new Rectangle(100, 200)

partial(console.log, [hasIn('width', square), hasIn('area', square), has('area', square)])('')

partial(console.log, [hasPath(['data', 'elapsed'], transformations)])('')

const raceResultsByFirstName = {
  first: 'alice',
  second: 'jake',
  third: 'alice'
}
const raceResults = ['caico', 'leung']

partial(console.log, [invert(raceResultsByFirstName)])('')
partial(console.log, [invertObj(raceResultsByFirstName), invertObj(raceResults)])('')

partial(console.log, [keys(square), keysIn(square)])('')

const xLens = lens(prop('first'), partial(concat, ['hi-']))

partial(console.log, [set(xLens, '你好', raceResultsByFirstName)])('')
partial(console.log, [view(xLens, raceResultsByFirstName)])('')
partial(console.log, [over(xLens, toUpper, raceResultsByFirstName)])('')

partial(console.log, [mapObjIndexed(toUpper, raceResultsByFirstName)])('')

print(merge(raceResultsByFirstName, {first: 'caico'}))
print(merge(raceResults, ['memeda']))
print(mergeAll([{a: 10}, {b: 20}, {c: 10}, {b: 123}]))

print(objOf('name', 'caico'))
print(omit(['firstName'], transformations))

print(path(['firstName'], transformations))
print(pathOr('not founf', ['firstName'], transformations), pathOr('notFound', ['fullName'], transformations))
print(paths([['data', 'remaining'], ['data', 'elapsed']], tomato))

print(pick(['a', 'b', 'f'], target))
print(pickAll(['a', 'b', 'f'], target))

const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2}
const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7}
const rusty = {name: 'Rusty', age: 10, hair: 'brown'}
const alois = {name: 'Alois', age: 15, disposition: 'surly'}
const kids: any = [abby, fred, rusty, alois]

print(project(['name', 'age'], kids))
print(filter(propEq('hair', 'brown'), kids))

print(toPairs(target))
print(toPairsIn(square))

print(values(square))
print(valuesIn(square))

const pred = where({
  a: equals('foo'),
  b: complement(equals('bar')),
  x: gt(__, 10),
  y: lt(__, 20)
})

print(pred({a: 'foo', b: 'bar', x: 11, y: 19})) //=> false
print(pred({a: 'foo', b: 'xxx', x: 11, y: 19})) //=> true
print(pred({a: 'xxx', b: 'xxx', x: 11, y: 19})) //=> false
print(pred({a: 'foo', b: 'xxx', x: 10, y: 19})) //=> false
print(pred({a: 'foo', b: 'xxx', x: 11, y: 20})) //=> false

const test = whereEq({
  a: 1,
  b: 2
})
print('\n')
print(test({a: 1, b: 2, c: 3}))
print(test({a: 2, b: 2, c: 3}))
