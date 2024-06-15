'use client'

import PageErrorDisplay from '@/components/PageErrorDisplay'

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <>
      <PageErrorDisplay error={error.message} />
      <button
        onClick={() => reset()}
        className="mx-auto block px-2 py-1 rounded bg-red-500 hover:bg-red-600 active:bg-red-700 focus:bg-red-700 border border-red-700 text-white"
        aria-describedby="errorResetDescrition"
      >
        Try again
      </button>
      <p id="errorResetDescrition" className="sr-only">
        You can try to reset the error by clicking the button Try again
      </p>
    </>
  )
}

export default ErrorPage
