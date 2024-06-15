import { getEuroExchangeMock } from '../../__mocks__'
import formattedCurrencies from '../../__mocks__/formattedCurrencies.json'

import { fetchCurrency, EURO_FOREX_API_URL } from '@/lib/fetchCurrency'

const mockFetch = vi.fn()
global.fetch = mockFetch
const options = {
  headers: {
    'Content-Type': 'text/xml',
  },
}

describe('fetchCurrency util', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue(getEuroExchangeMock())
  })

  afterEach(() => {
    mockFetch.mockReset()
  })

  it('should be fetching the specified url and specified content type', async () => {
    await fetchCurrency()

    expect(mockFetch).toHaveBeenCalledOnce()
    expect(mockFetch).toHaveBeenCalledWith(EURO_FOREX_API_URL, options)
  })

  it('should return the formatted response on call success', async () => {
    const [data, error] = await fetchCurrency()

    expect(data).toEqual(formattedCurrencies)
    expect(error).toBeNull()
  })

  it('should return the error response on call failure', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      statusText: 'Mock error',
    })
    const [data, error] = await fetchCurrency()

    expect(data).toBeNull()
    expect(error).toContain('Mock error')
  })
})
