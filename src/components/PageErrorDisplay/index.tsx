interface Props {
  error: string
}

const PageErrorDisplay = ({ error }: Props): JSX.Element => {
  return (
    <div className="h-[30vh] w-full flex flex-col justify-center items-center gap-2 my-4">
      <h2 className="text-red-500 font-semibold mt-4 text-xl">
        An error occurred: {error}
      </h2>
      <p className="text-red-500 font-semibold">Try to reload the page</p>
    </div>
  )
}

export default PageErrorDisplay
