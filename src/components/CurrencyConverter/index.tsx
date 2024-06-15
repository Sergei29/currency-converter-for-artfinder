'use client'

import { useState, type ChangeEvent } from 'react'
import { Repeat } from 'lucide-react'

import type { CurrencySummary } from '@/types'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import CurrencyInput from '@/components/CurrencyInput'
import { calculateCurrencyRate } from './utils'

export const useCurrencyInputs = (selectedCurrency: CurrencySummary) => {
  const [currencyValue, setCurrencyValue] = useState<string>('')
  const [baseCurrencyValue, setBaseCurrencyValue] = useState<string>('')

  const handleChangeCurrency = (event: ChangeEvent<HTMLInputElement>) => {
    const { base: newBaseValue } = calculateCurrencyRate(
      +event.target.value,
      selectedCurrency.rate,
    )

    setCurrencyValue(event.target.value)
    setBaseCurrencyValue(newBaseValue)
  }

  const handleChangeBaseCurrency = (event: ChangeEvent<HTMLInputElement>) => {
    const { current: newCurrentValue } = calculateCurrencyRate(
      +event.target.value,
      selectedCurrency.rate,
    )

    setBaseCurrencyValue(event.target.value)
    setCurrencyValue(newCurrentValue)
  }

  return {
    currencyValue,
    baseCurrencyValue,
    handleChangeCurrency,
    handleChangeBaseCurrency,
  }
}

interface Props {
  rates: CurrencySummary[]
  baseCurrency: CurrencySummary
}

const CurrencyConverter = ({ rates, baseCurrency }: Props): JSX.Element => {
  const [selectedCurrency, setSelectedCurrency] = useState(() => rates[0])
  const {
    currencyValue,
    baseCurrencyValue,
    handleChangeCurrency,
    handleChangeBaseCurrency,
  } = useCurrencyInputs(selectedCurrency)

  const currencyPerUnit = calculateCurrencyRate(1, selectedCurrency.rate)

  const handleSelect = (currencyId: string) => {
    const currencyFound = rates.find(
      (current) => current.currency === currencyId,
    )

    if (currencyFound) {
      setSelectedCurrency(currencyFound)
    }
  }

  return (
    <div
      data-testid="CurrencyConverter"
      className="grid grid-cols-1 md:grid-cols-[1fr_50px_1fr] mt-4 md:mt-8"
    >
      <div>
        <Label htmlFor="selectedCurrency" className="text-xs">
          {`1 ${selectedCurrency.currency} = ${currencyPerUnit.base} ${baseCurrency.currency}`}
        </Label>
        <Select
          defaultValue={selectedCurrency.currency}
          aria-describedby="currencySelect"
          onValueChange={handleSelect}
        >
          <SelectTrigger id="selectedCurrency" className="w-full">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="sr-only">Currencies</SelectLabel>
              {rates.map(({ currency, currencyName, flag }) => (
                <SelectItem key={currency} value={currency}>
                  <span className="flex gap-2">
                    <span>{flag}</span>
                    <span>{currencyName}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <span id="currencySelect" className="sr-only">
          Here you can select a currency to convert
        </span>

        <CurrencyInput
          id="selectedCurrencyValue"
          label={selectedCurrency.currencySymbol}
          value={currencyValue}
          onChange={handleChangeCurrency}
        />
      </div>

      <div className="flex justify-center items-center">
        <Repeat className="text-green-600 my-4 rotate-90 md:rotate-0" />
      </div>

      <div>
        <Label htmlFor="baseCurrency" className="text-xs">
          {`1 ${baseCurrency.currency} = ${currencyPerUnit.current} ${selectedCurrency.currency}`}
        </Label>
        <Select
          defaultValue={baseCurrency.currency}
          aria-describedby="baseCurrencySelect"
        >
          <SelectTrigger
            id="baseCurrency"
            className="w-full"
            disabled
            aria-disabled
          >
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="sr-only">Currencies</SelectLabel>
              <SelectItem value={baseCurrency.currency}>
                <span className="flex gap-2">
                  <span>{baseCurrency.flag}</span>
                  <span>{baseCurrency.currencyName}</span>
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <span id="baseCurrencySelect" className="sr-only">
          The only base currency available is set to EUR, this select is
          currently disabled
        </span>

        <CurrencyInput
          id="baseCurrencyValue"
          label={baseCurrency.currencySymbol}
          value={baseCurrencyValue}
          onChange={handleChangeBaseCurrency}
        />
      </div>
    </div>
  )
}

export default CurrencyConverter
