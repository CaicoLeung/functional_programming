const { curry, split, reduce } = require('ramda')

const match = curry((what, str) => str.match(what))

const replace = curry((what, replacement, str) => str.replace(what, replacement))

const filter = curry((f, ary) => ary.filter(f))

const map = curry((f, ary) => ary.map(f))

// 	匹配任何空白字符，包括空格、制表符、换页符等等
const hasSpaces = match(/\s+/g)

// 找出含有\s的元素
const findSpaces = filter(hasSpaces)

// 匹配元音字母
const noVowels = replace(/[aeiou]/ig)
// 替换为*
const censored = noVowels('*')

const words = split(' ')

const sentences = map(split(' '))

const filterQs = filter(match(/q/i))

const _keepHighest = (x,y) => x >= y ? x : y;

// 重构这段代码:
const max = reduce(_keepHighest, -Infinity);

const slice = curry((start, end, ary) => ary.slice(start, end))
const take = slice(0)

module.exports = {
  words,
  sentences,
  filterQs,
  max,
  slice,
  take
}
