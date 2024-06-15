export interface CurrencySummary {
  currency: string
  rate: number
  currencyName: string
  currencySymbol: string
  flag: string
}

export interface ApiPayloadCurrencyRates {
  _declaration: Declaration
  'gesmes:Envelope': GesmesEnvelope
}

export interface Declaration {
  _attributes: DeclarationAttributes
}

export interface DeclarationAttributes {
  version: string
  encoding: string
}

export interface GesmesEnvelope {
  _attributes: GesmesEnvelopeAttributes
  'gesmes:subject': Gesmes
  'gesmes:Sender': GesmesSender
  Cube: GesmesEnvelopeCube
}

export interface GesmesEnvelopeCube {
  Cube: PurpleCube
}

export interface PurpleCube {
  _attributes: FluffyAttributes
  Cube: CubeElement[]
}

export interface CubeElement {
  _attributes: PurpleAttributes
}

export interface PurpleAttributes {
  currency: string
  rate: string
}

export interface FluffyAttributes {
  time: string // as Date YYYY-MM-DD
}

export interface GesmesEnvelopeAttributes {
  'xmlns:gesmes': string
  xmlns: string
}

export interface GesmesSender {
  'gesmes:name': Gesmes
}

export interface Gesmes {
  _text: string
}
