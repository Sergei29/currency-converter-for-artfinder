import convert from 'xml-js'

import type { ApiPayloadCurrencyRates } from '@/types'

export const EURO_FOREX_API_URL =
  'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'

export const convertToJson = (data: string) =>
  JSON.parse(convert.xml2json(data, { compact: true, spaces: 2 }))

const decodeHtmlCharCodes = (str: string) => {
  return str.replace(/(&#(\d+);)/g, function (match, capture, charCode) {
    return String.fromCharCode(charCode)
  })
}

const currencyDetails: Record<
  string,
  {
    flag: string
    currencyName: string
    currencySymbol: string
  }
> = {
  EUR: {
    flag: '🇪🇺',
    currencyName: 'Euro',
    currencySymbol: decodeHtmlCharCodes('&#8364;'),
  },
  USD: {
    flag: '🇺🇸',
    currencyName: 'United States Dollar',
    currencySymbol: '$',
  },
  JPY: {
    flag: '🇯🇵',
    currencyName: 'Yen',
    currencySymbol: decodeHtmlCharCodes('&#165;'),
  },
  BGN: {
    flag: '🇧🇬',
    currencyName: 'Bulgarian Lev',
    currencySymbol: decodeHtmlCharCodes('&#1083;&#1074;'),
  },
  CZK: {
    flag: '🇨🇿',
    currencyName: 'Czech Koruna',
    currencySymbol: decodeHtmlCharCodes('&#75;&#269;'),
  },
  DKK: { flag: '🇩🇰', currencyName: 'Danish Krone', currencySymbol: 'kr' },
  GBP: { flag: '🇬🇧', currencyName: 'Pound Sterling', currencySymbol: '£' },
  HUF: { flag: '🇭🇺', currencyName: 'Forint', currencySymbol: 'Ft' },
  PLN: {
    flag: '🇵🇱',
    currencyName: 'Zloty',
    currencySymbol: decodeHtmlCharCodes('&#122;&#322;'),
  },
  RON: { flag: '🇷🇴', currencyName: 'Romanian Leu', currencySymbol: 'lei' },
  SEK: { flag: '🇸🇪', currencyName: 'Swedish Krona', currencySymbol: 'kr' },
  CHF: {
    flag: '🇨🇭',
    currencyName: 'Swiss Franc',
    currencySymbol: 'CHF',
  },
  ISK: { flag: '🇮🇸', currencyName: 'Iceland Krona', currencySymbol: 'kr' },
  NOK: { flag: '🇳🇴', currencyName: 'Norwegian Krone', currencySymbol: 'kr' },
  TRY: {
    flag: '🇹🇷',
    currencyName: 'Turkish Lira',
    currencySymbol: decodeHtmlCharCodes('&#8378;'),
  },
  AUD: { flag: '🇦🇺', currencyName: 'Australian Dollar', currencySymbol: '$' },
  BRL: { flag: '🇧🇷', currencyName: 'Brazilian Real', currencySymbol: 'R$' },
  CAD: { flag: '🇨🇦', currencyName: 'Canadian Dollar', currencySymbol: '$' },
  CNY: {
    flag: '🇨🇳',
    currencyName: 'Yuan Renminbi',
    currencySymbol: decodeHtmlCharCodes('&#165;'),
  },
  HKD: { flag: '🇭🇰', currencyName: 'Hong Kong Dollar', currencySymbol: '$' },
  IDR: { flag: '🇮🇩', currencyName: 'Rupiah', currencySymbol: 'Rp' },
  ILS: {
    flag: '🇮🇱',
    currencyName: 'New Israeli Sheqel',
    currencySymbol: decodeHtmlCharCodes('&#8362;'),
  },
  INR: {
    flag: '🇮🇳',
    currencyName: 'Indian Rupee',
    currencySymbol: decodeHtmlCharCodes('&#8377;'),
  },
  KRW: {
    flag: '🇰🇷',
    currencyName: 'Won',
    currencySymbol: decodeHtmlCharCodes('&#8361;'),
  },
  MXN: { flag: '🇲🇽', currencyName: 'Mexican Peso', currencySymbol: '$' },
  MYR: { flag: '🇲🇾', currencyName: 'Malaysian Ringgit', currencySymbol: 'RM' },
  NZD: { flag: '🇳🇿', currencyName: 'New Zealand Dollar', currencySymbol: '$' },
  PHP: {
    flag: '🇵🇭',
    currencyName: 'Philippine Peso',
    currencySymbol: decodeHtmlCharCodes('&#8369;'),
  },
  SGD: { flag: '🇸🇬', currencyName: 'Singapore Dollar', currencySymbol: '$' },
  THB: {
    flag: '🇹🇭',
    currencyName: 'Baht',
    currencySymbol: decodeHtmlCharCodes('&#3647;'),
  },
  ZAR: { flag: '🇿🇦', currencyName: 'Rand', currencySymbol: 'R' },
}

export const formatCurrenciesPayload = (
  apiPayload: ApiPayloadCurrencyRates,
) => {
  const { Cube, _attributes } = apiPayload['gesmes:Envelope'].Cube.Cube

  const date = _attributes.time

  const currencies = Cube.map((current) => {
    const { currency, rate } = current._attributes
    const { currencyName, flag, currencySymbol } = currencyDetails[
      currency
    ] || {
      flag: '💰',
      currencyName: currency,
      currencySymbol: currency,
    }

    return {
      currency,
      rate: parseFloat(rate),
      currencyName,
      flag,
      currencySymbol,
    }
  })

  return {
    date,
    currencies,
    baseCurrency: {
      currency: 'EUR',
      rate: 1,
      ...currencyDetails['EUR'],
    },
  }
}

export const fetchCurrency = async (): Promise<
  [ReturnType<typeof formatCurrenciesPayload>, null] | [null, string]
> => {
  try {
    const res = await fetch(EURO_FOREX_API_URL, {
      headers: {
        'Content-Type': 'text/xml',
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch currencies: ${res.statusText}`)
    }

    const xml = await res.text()

    const data = convertToJson(xml)

    return [formatCurrenciesPayload(data), null]
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch currencies'

    return [null, message]
  }
}
