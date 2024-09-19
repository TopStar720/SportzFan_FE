import React from 'react'
import Spinner from 'react-spinners/MoonLoader'

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen flex justify-center items-center bg-black/50">
      <Spinner size={60} color="#0b98c5" />
    </div>
  )
}

export default Loader
