import { renderHook, act } from '@testing-library/react'
import { ChangeEvent } from 'react'

import { useCurrencyInputs } from '@/components/CurrencyConverter'

describe('useCurrencyInputs custom hook', () => {
  const { selectedCurrencyMock, changeEventMock } = getTestData()

  it('should render the hook with initial values', () => {
    const { result } = renderHook(() => useCurrencyInputs(selectedCurrencyMock))
    const {
      currencyValue,
      baseCurrencyValue,
      handleChangeBaseCurrency,
      handleChangeCurrency,
    } = result.current

    expect(currencyValue).toBe('')
    expect(baseCurrencyValue).toBe('')
    expect(typeof handleChangeBaseCurrency === 'function').toBe(true)
    expect(typeof handleChangeCurrency === 'function').toBe(true)
  })

  it('should update currencies on changing selected currency input', () => {
    const { result, rerender } = renderHook(() =>
      useCurrencyInputs(selectedCurrencyMock),
    )
    const { handleChangeCurrency } = result.current

    act(() => {
      handleChangeCurrency(changeEventMock)
    })
    rerender()
    const { baseCurrencyValue, currencyValue } = result.current

    expect(currencyValue).toEqual('2')
    expect(baseCurrencyValue).toEqual('2.375')
  })

  it('should update currencies on changing base currency input', () => {
    const { result, rerender } = renderHook(() =>
      useCurrencyInputs(selectedCurrencyMock),
    )
    const { handleChangeBaseCurrency } = result.current

    act(() => {
      handleChangeBaseCurrency(changeEventMock)
    })
    rerender()
    const { baseCurrencyValue, currencyValue } = result.current

    expect(currencyValue).toEqual('1.684')
    expect(baseCurrencyValue).toEqual('2')
  })
})

function getTestData() {
  const changeEventMock = {
    target: { value: '2' },
  } as ChangeEvent<HTMLInputElement>

  const selectedCurrencyMock = {
    currency: 'GBP',
    rate: 0.84205,
    currencyName: 'Pound Sterling',
    flag: '🇬🇧',
    currencySymbol: '£',
  }

  return {
    changeEventMock,
    selectedCurrencyMock,
  }
}
