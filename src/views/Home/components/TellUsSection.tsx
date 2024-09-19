import Link from 'next/link'

const TellUsSection = () => {
  return (
    <div className="relative pt-60 xl:py-20">
      <div className="w-full flex xl:block justify-center absolute xl:left-24 top-0 xl:top-0 ">
        <img src="/assets/images/token-with-ambient-effect.png" className="h-120 xl:h-136" />
      </div>
      <div className="border border-sf-zinc-600 bg-info rounded-[4px] flex flex-col sm:flex-row justify-center items-center px-30 pt-86 xl:pt-26 pb-26">
        <div className="flex-1 ml-0 xl:ml-150 mr-4 mb-20 sm:mb-0 text-center sm:text-left">
          <p className="text-18 xs:text-20 text-sf-gray-300 leading-24">Tell us more about yourself and earn Tokens</p>
          <p className="text-10 xs:text-12 text-sf-zinc-400 font-poppins leading-20 mt-4">
            Let us help personalise your fan experience
          </p>
        </div>
        <Link href="/profile">
          <button className="relative bg-danger rounded-[4px] px-18 py-12 text-14 leading-18 text-white uppercase">
            Update Now
          </button>
        </Link>
      </div>
    </div>
  )
}

export default TellUsSection
