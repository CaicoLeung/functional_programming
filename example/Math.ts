import {
  add, dec, divide, inc, mathMod, mean, median, product, subtract, sum
} from 'ramda'

import { print } from './Unit'

print(add(10, 10)) // 20
print(dec(100)) // 99
print(divide(100, 10)) // 10
print(inc(50)) // 51
print(subtract(100, 10)) // 100 - 10 = 90

print('\n')

print(mathMod(-17, 5)) // 3
print(mathMod(17, 5)) // 2
print(mathMod(3, 1)) // 2

print('\n')

print(mean([1, 2, 3])) // 平均数2
print(median([1, 3, 9, 10])) // 中位数6
print(product([1, 2, 3])) // 1 * 2 * 3 = 6
print(sum([1, 2, 3])) // 1 + 2 + 3 = 6
