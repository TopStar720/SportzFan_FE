import React from 'react'
import Spinner from 'react-spinners/MoonLoader'

const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-sf-zinc-900">
      <Spinner size={60} color="#0b98c5" />
    </div>
  )
}

export default PageLoader
