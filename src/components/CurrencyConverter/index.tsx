import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {}

const CurrencyConverter = ({}: Props): JSX.Element => {
  return (
    <div data-testid="CurrencyConverter">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <div>
        <Label
          htmlFor="selectedCurrencyValue"
          className="flex justify-center items-center text-neutral-500 font-semibold text-2xl"
        >
          $
        </Label>
        <Input
          id="selectedCurrencyValue"
          type="number"
          step={0.01}
          className="h-full text-2xl"
          placeholder="Enter your value"
          aria-describedby="currencyInput"
        />
        <span id="currencyInput" className="sr-only">
          Here you can enter an amount to convert, use comma if need to enter
          decimals
        </span>
      </div>
    </div>
  )
}

export default CurrencyConverter
