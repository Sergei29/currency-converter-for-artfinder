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
})
