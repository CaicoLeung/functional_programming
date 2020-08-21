import {
  addIndex, always, andThen, defaultTo, has, hasPath, ifElse, isEmpty, map, otherwise, partial, pick, pipe, prop, split
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
