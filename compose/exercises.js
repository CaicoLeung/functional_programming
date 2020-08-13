const accounting = require('accounting')
const { compose, last, prop, head, reduce, map, add, curry, replace, filter, join, sortBy, flip, concat } = require('ramda')

const CARS = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
];

// 练习 1:
// ============
// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
// _.last 返回列表或字符串的最后一个元素。
// _.prop 取出对象中指定属性的值。如果不存在，则返回 undefined。
// _.head 求列表或字符串的首个元素。在某些库中，该函数也被称作 first。

/* var isLastInStock = function(cars) {
  var last_car = _.last(cars);
  return _.prop('in_stock', last_car);
}; */

const isLastInStock = compose(prop('in_stock'), last)

// 练习 2:
// ============
// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
const nameOfFirstCar = compose(prop('name'), head);

// 练习 3:
// ============
// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
var _average = function(xs) { return reduce(add, 0, xs) / xs.length; }; // <- 无须改动

/* var averageDollarValue = function(cars) {
  var dollar_values = map(function(c) { return c.dollar_value; }, cars);
  return _average(dollar_values);
}; */
const averageDollarValue = compose(_average, map(prop('dollar_value')))

// 练习 4:
// ============
// 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。

var _underscore = replace(/\W+/g, '_'); //<-- 无须改动，并在 sanitizeNames 中使用它

const toLowerCase = curry(str => str.toLowerCase())
const sanitizeNames = map(compose(_underscore, toLowerCase, prop('name')))

// 彩蛋 1:
// ============
// 使用 compose 重构 availablePrices

/* var availablePrices = function(cars) {
  var available_cars = filter(prop('in_stock'), cars);
  return available_cars.map(function(x){
    return accounting.formatMoney(x.dollar_value);
  }).join(', ');
}; */

const formatPrice = compose(accounting.formatMoney, prop('dollar_value'))
const availablePrices = compose(join(', ') , map(formatPrice), filter(prop('in_stock')))

// 彩蛋 2:
// ============
// 重构使之成为 pointfree 函数。提示：可以使用 _.flip()
// _.filp 交换函数前两个参数的位置。


/* var fastestCar = function(cars) {
  var sorted = sortBy(function(car){ return car.horsepower }, cars);
  var fastest = last(sorted);
  return fastest.name + ' is the fastest';
}; */

const append = flip(concat)
const fastestCar = compose(append(' is the fastest'), prop('name'), last , sortBy(prop('horsepower')))

module.exports = {
  CARS,
  isLastInStock,
  nameOfFirstCar,
  averageDollarValue,
  sanitizeNames,
  availablePrices,
  fastestCar,
}
