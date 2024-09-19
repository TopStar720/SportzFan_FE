import { useState } from 'react'
import DetailsSection from './components/DetailsSection'
import SuccessModal from './components/SuccessModal'

const Refer = () => {
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  return (
    <div className="referal-page">
      <DetailsSection />
      <div className="md:px-26">
        <div className="w-full h-20" />
        <div className="w-full max-w-410 bg-dark rounded-[5px] px-12 pt-16 pb-10">
          <p className="text-12 xs:text-14 text-sf-gray-300">Get 3 more users to sign up to complete the challenge</p>
          <div className="w-full h-10" />
          <div className="relative w-full h-14">
            <div className="progress absolute w-full h-12 rounded-full top-px" />
            <div className="relative flex items-center">
              <div className="progress-bar h-8 rounded-full relative ml-2" style={{ width: '40%' }} />
              <div className="relative progression w-14 h-14 flex justify-center items-center rounded-full -ml-10" />
            </div>
          </div>
          <div className="flex justify-between -mt-8">
            <div className="flex flex-col items-start">
              <div className="w-px h-16 border-l border-sf-yellow-200 border-dashed" />
              <span className="text-8 text-sf-yellow-200 font-poppins mt-2">0</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-16 border-l border-sf-yellow-200 border-dashed" />
              <span className="text-8 text-sf-yellow-200 font-poppins mt-2">1</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-16 border-l border-sf-yellow-200 border-dashed" />
              <span className="text-8 text-sf-yellow-200 font-poppins mt-2">2</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-16 border-l border-sf-yellow-200 border-dashed" />
              <span className="text-8 text-sf-yellow-200 font-poppins mt-2">3</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-16 border-l border-sf-yellow-200 border-dashed" />
              <span className="text-8 text-sf-yellow-200 font-poppins mt-2">4</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="w-px h-16 border-l border-sf-yellow-200 border-dashed" />
              <span className="text-8 text-sf-yellow-200 font-poppins mt-2">5</span>
            </div>
          </div>
        </div>
        <div className="w-full h-20" />
        <div className="w-full max-w-410">
          <span className="text-12 leading2-20 text-sf-zinc-400 font-poppins mb-6">
            Copy your personal code to share anywhere
          </span>
          <div className="flex justify-between items-center bg-sf-zinc-700 rounded-[5px] p-6">
            <p className="text-12 leading-18 text-white font-poppins font-medium px-14">https://wwwag/sportzfun.com</p>
            <button className="bg-danger rounded-[4px] px-22 py-4">
              <span className="text-12 leading-14 text-white uppercase">Copy</span>
            </button>
          </div>
        </div>
        <div className="w-full h-20" />
        <div className="w-full max-w-410">
          <span className="text-12 leading2-20 text-sf-zinc-400 font-poppins mb-6">
            Share your referral link by email
          </span>
          <div className="flex justify-between items-center border border-sf-zinc-600 rounded-[5px] p-6">
            <input
              className="w-full bg-transparent text-12 leading-18 text-white font-poppins px-14"
              placeholder="Enter email id"
            />
            <button className="bg-danger rounded-[4px] px-22 py-4" onClick={() => setShowSuccessModal(true)}>
              <span className="text-12 leading-14 text-white uppercase">Send</span>
            </button>
          </div>
        </div>
      </div>
      <SuccessModal show={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  )
}

export default Refer
