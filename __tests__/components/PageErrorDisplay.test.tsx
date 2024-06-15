import { render } from '@testing-library/react'

import PageErrorDisplay from '@/components/PageErrorDisplay'

describe('PageErrorDisplay', () => {
  it('should render the component', () => {
    const { baseElement } = render(<PageErrorDisplay error="Mock error" />)

    expect(baseElement).toBeInTheDocument()
  })

  it('should render the error message', () => {
    const { getByText } = render(<PageErrorDisplay error="Mock error" />)
    const errorMessage = getByText(/Mock error/i)

    expect(errorMessage).toBeInTheDocument()
  })
})
