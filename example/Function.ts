import {
  add,
  addIndex,
  always,
  andThen,
  ap,
  apply,
  applySpec,
  applyTo,
  ascend,
  bind,
  comparator,
  composeP,
  descend,
  divide,
  hasPath,
  identity,
  ifElse,
  inc,
  map,
  multiply,
  otherwise,
  partial,
  pipe,
  prop,
  sort,
  split
} from 'ramda'
import {print, printError} from './Unit'

const logKV = (item, index) => `${index}-${item}`
print(addIndex(map)(logKV, split('', 'caico')))

const myName = always('caico')
const caico = always({ name: 'caico', age: 15 })
print(myName(), caico())

interface IQuery {
  query: {
    email: string
  }
}
const makeQuery = (email) => ({ query: { email } })
const failQuery = (email) => ({ email })
const fetchMember = async (query: any): Promise<IQuery> => new Promise((resolve, reject) => {
  ifElse(hasPath(['query', 'email']), resolve, partial(reject, ['not found']))(query)
})

const getMemberHandle = pipe(makeQuery, fetchMember, andThen(print), otherwise(printError))
const getMemberFailHandle = pipe(failQuery, fetchMember,  andThen(print), otherwise(printError))
getMemberHandle('1234567@qq.com')
getMemberFailHandle('1234567@qq.com')

print(ap([add(10), multiply(2)], [1, 2, 3]))
print(ap(add, inc)(10)) // 10 + (10 + 1) = 21
print(ap(multiply, divide(100))(10)) // 10 * (100 / 10) = 100

print('\n')

print(apply(Math.max, [1, 2, 3, 12, 10]))

const getMetrics = applySpec({
  num: add(10),
  nested: {
    mul: multiply(2)
  }
})

print(getMetrics(2))

print(applyTo(51)(inc))

const people = [
  { name: 'Emma', age: 70 },
  { name: 'Peter', age: 78 },
  { name: 'Mikhail', age: 62 },
]
print(sort(ascend(prop('age')), people))
print(sort(ascend(identity), [3, 1, 5, 4]))
print(sort(descend(identity), [3, 1, 5, 4]))
print(sort(comparator((a, b) => a.age < b.age), people))

function logX(arg) {
  console.log(this[0].name, arg)
}

bind(logX, people)('i am arg')

const db = {
  users: {
    JOE: {
      name: 'Joe',
      followers: ['STEVE', 'SUZY']
    }
  }
}

const lookupUser = (userId) => Promise.resolve(db.users[userId])
const lookupFollowers = (user) => Promise.resolve(user.followers)

const followersForUser = composeP(lookupFollowers, lookupUser)
followersForUser('JOE').then(print)
