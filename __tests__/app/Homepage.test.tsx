import { render } from '@testing-library/react'

import Homepage from '@/app/page'
import * as utils from '@/lib/fetchCurrency'
import formattedCurrencies from '../../__mocks__/formattedCurrencies.json'

const fetchCurrencySpy = vi.spyOn(utils, 'fetchCurrency')

describe('Homepage as a server component', () => {
  beforeEach(() => {
    fetchCurrencySpy.mockResolvedValue([formattedCurrencies, null])
  })
  afterEach(() => {
    fetchCurrencySpy.mockReset()
  })

  it('should render the page', async () => {
    const { baseElement } = render(await Homepage())

    expect(baseElement).toBeInTheDocument()
  })

  it('should render the page title', async () => {
    const { getByRole } = render(await Homepage())
    const pageTitle = getByRole('heading', {
      level: 1,
    })

    expect(pageTitle).toBeInTheDocument()
    expect(pageTitle).toHaveTextContent(/Currency Converter/i)
  })

  it('should render the CurrencyConverter on success', async () => {
    const { getByTestId } = render(await Homepage())
    const currencyConverter = getByTestId('CurrencyConverter')

    expect(currencyConverter).toBeInTheDocument()
  })

  it('should render the error message on api call failure instead of the CurrencyConverter', async () => {
    fetchCurrencySpy.mockResolvedValue([null, 'Mock error message'])
    const { findByText, queryByTestId } = render(await Homepage())

    const errorMessage = await findByText(/Mock error message/i)
    const currencyConverter = queryByTestId('CurrencyConverter')

    expect(errorMessage).toBeInTheDocument()
    expect(currencyConverter).toBeNull()
  })
})
