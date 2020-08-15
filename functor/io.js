const {compose, reject, split, head} = require('ramda')
const fs = require('fs')

const readFile = (filename) => {
  return new Task((reject, result) => {
    fs.readFile(filename, 'utf-8', (err, data) => err ? reject(err) : result(data))
  })
}

const result = readFile('index.js').map(split('\n')).map(head)
console.log(result);