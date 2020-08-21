const { compose, map } = require('ramda')
const fs = require('fs')
const { IO } = require('../functor/io')

const readFile = (fileName) => {
  return new IO(() => fs.readFileSync(fileName, 'utf-8'))
}

const print = (x) => {
  return new IO(() => {
    console.log(x)
    return x
  })
}

// Example
const cat = compose(map(print), readFile)
console.log(cat('monad/index.js'))

const catMonad = compose(IO.join, map(print), readFile)
console.log(catMonad('monad/index.js'))
