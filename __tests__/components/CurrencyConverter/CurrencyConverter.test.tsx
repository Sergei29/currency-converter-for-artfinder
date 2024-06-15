import { render } from '@testing-library/react'

import CurrencyConverter from '@/components/CurrencyConverter'

describe('CurrencyConverter', () => {
  it('should render the component', () => {
    const { baseElement } = render(<CurrencyConverter />)

    expect(baseElement).toBeInTheDocument()
  })
})
