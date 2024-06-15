import { render } from '@testing-library/react'

import CurrencyInput from '@/components/CurrencyInput'

describe('CurrencyInput', () => {
  const mockProps = {
    label: 'Label text',
    id: 'mockInputId',
  }

  it('should render the component', () => {
    const { baseElement } = render(<CurrencyInput {...mockProps} />)

    expect(baseElement).toBeInTheDocument()
  })

  it('should render the label and input', () => {
    const { getByLabelText } = render(<CurrencyInput {...mockProps} />)
    const input = getByLabelText('Label text')

    expect(input).toBeInTheDocument()
  })

  it('should render the input of type number with decimal options', () => {
    const { baseElement, getByLabelText } = render(
      <CurrencyInput {...mockProps} />,
    )
    const input = getByLabelText('Label text')

    expect(input.getAttribute('type')).toEqual('number')
    expect(input.getAttribute('step')).toEqual('0.01')
  })

  it('should render the assistive technology description', () => {
    const { baseElement, getByLabelText } = render(
      <CurrencyInput {...mockProps} />,
    )
    const descriptionId = `${mockProps.id}Description`
    const input = getByLabelText('Label text')
    const description = baseElement.querySelector(`#${descriptionId}`)

    expect(input.getAttribute('aria-describedby')).toEqual(descriptionId)
    expect(description).toBeInTheDocument()
  })
})
