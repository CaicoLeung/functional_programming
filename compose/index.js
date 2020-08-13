const { compose, reduce, replace, curry, join, map, split } = require('ramda')

const toUpperCase = (x) => x.toUpperCase()
const exclaim = (x) => x + '!'

const shout = compose(toUpperCase, exclaim)

console.log(shout('send in the clowns'));

const head = x => x[0]
const reverse = reduce((acc, x) => [x].concat(acc), [])
const lastUpper = compose(exclaim, toUpperCase, head, reverse)

const result = lastUpper(['jumpkick', 'roundhouse', 'uppercut'])
console.log(result);

const toLowerCase = curry((str) => str.toLowerCase())
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase)

console.log(snakeCase('caico leung'));

const initials = compose(join('. '), map(compose(toUpperCase, head)), split(' '))
console.log(initials('hunter stockton thompson'))// 'H. S. T'

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x
})

const dasherize = compose(join('-') , map(toLowerCase), trace('after aplit'), split(' '), replace(/\s{2,}/ig, ' '))
console.log(dasherize('The world is a vampire'));