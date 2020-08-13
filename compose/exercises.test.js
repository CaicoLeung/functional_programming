const E = require('./exercises')
const assert = require('chai').assert

describe('compose 练习', () => {
  it('练习1', () => {
    assert.equal(E.isLastInStock(E.CARS), false)
  })

  it('练习2', () => {
    assert.equal(E.nameOfFirstCar(E.CARS), 'Ferrari FF')
  })

  it('练习3', () => {
    assert.equal(E.averageDollarValue(E.CARS), 790700)
  })

  it('练习4', () => {
    assert.deepEqual(E.sanitizeNames(E.CARS), ['ferrari_ff', 'spyker_c12_zagato', 'jaguar_xkr_s', 'audi_r8', 'aston_martin_one_77', 'pagani_huayra'])
  })

  it('彩蛋1', () => {
    assert.equal(E.availablePrices(E.CARS), '$700,000.00, $1,850,000.00')
  })

  it('彩蛋2', () => {
    assert.equal(E.fastestCar(E.CARS), 'Aston Martin One-77 is the fastest')
  })
})
