'use client'

import { Input, InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props extends InputProps {
  label: string
}

const CurrencyInput = ({
  id,
  label,
  ...restInputProps
}: Props): JSX.Element => {
  const descriptionId = `${id}Description`

  return (
    <div
      className="bg-marine-600 h-24 grid grid-cols-[50px_1fr]"
      data-testid="CurrencyInput"
    >
      <Label
        htmlFor={id}
        className="flex justify-center items-center text-neutral-500 font-semibold text-2xl"
      >
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        step={0.01}
        className="h-full text-2xl"
        placeholder="Enter your value"
        aria-describedby={descriptionId}
        {...restInputProps}
      />
      <span id={descriptionId} className="sr-only">
        Here you can enter an amount to convert, use comma if need to enter
        decimals
      </span>
    </div>
  )
}

export default CurrencyInput
