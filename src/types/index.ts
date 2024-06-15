export interface CurrencySummary {
  currency: string
  rate: number
  currencyName: string
  currencySymbol: string
  flag: string
}

export interface ApiPayloadCurrencyRates {
  _declaration: {
    _attributes: {
      version: string
      encoding: string
    }
  }
  'gesmes:Envelope': GesmesEnvelope
}

export interface GesmesEnvelope {
  _attributes: {
    'xmlns:gesmes': string
    xmlns: string
  }
  'gesmes:subject': Gesmes
  'gesmes:Sender': {
    'gesmes:name': Gesmes
  }
  Cube: {
    Cube: {
      _attributes: {
        time: string // as Date YYYY-MM-DD
      }
      Cube: CubeElement[]
    }
  }
}

export interface CubeElement {
  _attributes: {
    currency: string
    rate: string
  }
}

export interface Gesmes {
  _text: string
}
