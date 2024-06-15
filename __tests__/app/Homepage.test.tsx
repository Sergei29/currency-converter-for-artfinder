import { render } from '@testing-library/react'

import Homepage from '@/app/page'

describe('Homepage as a server component', () => {
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
    expect(pageTitle).toHaveTextContent(/Home Page/i)
  })
})
