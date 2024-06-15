import { fetchCurrency } from '@/lib/fetchCurrency'
import CurrencyConverter from '@/components/CurrencyConverter'
import PageErrorDisplay from '@/components/PageErrorDisplay'

export const revalidate = 3600

const HomePage = async () => {
  const [forexData, fetchError] = await fetchCurrency()

  return (
    <>
      <h1 className="text-3xl font-bold">Currency Converter</h1>
      {fetchError && <PageErrorDisplay error={fetchError} />}
      {forexData && (
        <CurrencyConverter
          rates={forexData.currencies}
          baseCurrency={forexData.baseCurrency}
        />
      )}
    </>
  )
}

export default HomePage
