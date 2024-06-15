import { render, fireEvent } from '@testing-library/react'

import ErrorPage from '@/app/error'

describe('Error page', () => {
  const mockReset = vi.fn()
  const mockProps = {
    error: new Error('Mock error message'),
    reset: mockReset,
  }

  it('should render the page', () => {
    const { baseElement } = render(<ErrorPage {...mockProps} />)

    expect(baseElement).toBeInTheDocument()
  })

  it('should display message and reset button', () => {
    const { getByText, getByRole } = render(<ErrorPage {...mockProps} />)
    const errorMessage = getByText(/Mock error message/i)
    const resetButton = getByRole('button')

    expect(errorMessage).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
    expect(resetButton).toHaveTextContent(/Try again/i)
  })

  it('should call reset when reset button is clicked', () => {
    const { getByRole } = render(<ErrorPage {...mockProps} />)
    const resetButton = getByRole('button', {
      name: /Try again/i,
    })
    fireEvent.click(resetButton)

    expect(mockReset).toHaveBeenCalledOnce()
  })
})
