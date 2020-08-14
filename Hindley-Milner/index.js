const { curry, compose, head, tail, toUpper, toLower } = require('ramda')

// capitalize :: String -> String
const capitalize = (s) => toUpper(head(s)) + toLower(tail(s))
console.log(capitalize('smurf'));

// strLength :: String -> Number
const strLength = (s) => s.length

// join :: String -> ([Sting] -> Sting)
const join = curry((what, xs) => xs.join(what))
const middleLineStr = join('-')
console.log(middleLineStr(['111', '222', '333']));

// match :: Regex -> (String -> [String])
const match = curry((reg, xs) => xs.match(reg))
const onCaicoMatch = match(/caico/ig)
console.log(onCaicoMatch('caico leung'));

// replace :: Regex -> String -> String -> String
const replace = curry((reg, sub, s) => s.replace(reg, sub))
const caicoToMemeda = replace(/caico/ig, 'memeda')
console.log(caicoToMemeda('hi, caico Leung'));

// id :: a -> a
const id = (x) => x

// map :: (a -> b) -> [a] -> [b]
const map = curry((f, xs) => xs.map(f))

// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce => curry((f, x, xs) => xs.reduce(f, x))