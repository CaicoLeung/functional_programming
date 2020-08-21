import {compose, partial} from 'ramda'
import { green, red } from 'colors'

export const print = partial(compose(console.log, green), [])
export const printError = partial(compose(console.log, red), [])
