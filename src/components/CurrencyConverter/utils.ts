const isInteger = (num: number) => Math.floor(num) === num

/**
 * @description converts currency based on amount and conversion rate
 * Example: IF EUR/USD = 1.07
 * EUR - base currency
 * USD - selected currency
 * rate is ratio EUR/USD
 * Note: not sure if it is a smart way to calculate it tbh...
 * @returns stringified values for current and base currency
 */
export const calculateCurrencyRate = (amount: number, rate: number) => {
  if (amount === 0) {
    return { base: '0', current: '0' }
  }

  const newCurrency = amount * rate
  const newBaseCurrency = amount / rate

  return {
    base: isInteger(newBaseCurrency)
      ? newBaseCurrency.toString()
      : newBaseCurrency.toPrecision(4),
    current: isInteger(newCurrency)
      ? newCurrency.toString()
      : newCurrency.toPrecision(4),
  }
}
