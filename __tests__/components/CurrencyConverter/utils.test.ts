import { calculateCurrencyRate } from '@/components/CurrencyConverter/utils'

describe('calculateCurrencyRate util function', () => {
  const mockEurUsdRate = 1.07

  it.each([
    [0, mockEurUsdRate, { base: '', current: '' }],
    [1, mockEurUsdRate, { base: '0.9346', current: '1.070' }],
    [100, mockEurUsdRate, { base: '93.46', current: '107' }],
  ])('calculateCurrencyRate(%i, %i) => %o', (amount, rate, expected) => {
    expect(calculateCurrencyRate(amount, rate)).toEqual(expected)
  })
})
