import { render } from '@testing-library/react'

import CurrencyConverter from '@/components/CurrencyConverter'

describe('CurrencyConverter', () => {
  const mockProps = {
    rates: [
      {
        currency: 'DKK',
        rate: 7.4605,
        currencyName: 'Danish Krone',
        flag: '🇩🇰',
        currencySymbol: 'kr',
      },
      {
        currency: 'GBP',
        rate: 0.84205,
        currencyName: 'Pound Sterling',
        flag: '🇬🇧',
        currencySymbol: '£',
      },
    ],
    baseCurrency: {
      currency: 'EUR',
      rate: 1,
      flag: '🇪🇺',
      currencyName: 'Euro',
      currencySymbol: '€',
    },
  }

  it('should render the component', () => {
    const { baseElement } = render(<CurrencyConverter {...mockProps} />)

    expect(baseElement).toBeInTheDocument()
  })

  it('should render 2 select and 2 input elements', () => {
    const { getByLabelText } = render(<CurrencyConverter {...mockProps} />)
    const selectCurrency = getByLabelText(/1 DKK = 0.1340 EUR/i)
    const selectbaseCurrency = getByLabelText(/1 EUR = 7.460 DKK/i)
    const inputLeft = getByLabelText('kr')
    const inputRight = getByLabelText('€')

    expect(selectCurrency).toBeInTheDocument()
    expect(selectbaseCurrency).toBeInTheDocument()
    expect(inputLeft).toBeInTheDocument()
    expect(inputRight).toBeInTheDocument()
  })

  it('should render with the first currency selected', () => {
    const { getByLabelText } = render(<CurrencyConverter {...mockProps} />)
    const selectCurrency = getByLabelText(/1 DKK = 0.1340 EUR/i)

    expect(selectCurrency).toHaveTextContent(/Danish Krone/i)
  })
})
