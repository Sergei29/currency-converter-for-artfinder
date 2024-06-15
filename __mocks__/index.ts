import { readFile, writeFile } from 'fs/promises'
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

export const saveMockData = async <D = Record<string, unknown>>(
  data: D,
  filename: string,
) => {
  try {
    const pathname = path.join(process.cwd(), '__mocks__', `${filename}.json`)
    await writeFile(pathname, JSON.stringify(data), { encoding: 'utf-8' })
    console.log('Saved to __mocks__/')
  } catch (error) {
    console.log('write file error :>> ', error)
  }
}
