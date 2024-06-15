import { readFile } from 'fs/promises'
import path from 'path'

export const getEuroExchangeMock = async () => {
  const textFile = await readFile(
    path.join(process.cwd(), '__mocks__/euroExchange.txt'),
    {
      encoding: 'utf-8',
    },
  )

  return {
    ok: true,
    statusText: 'OK',
    text: () => Promise.resolve(textFile),
  }
}
