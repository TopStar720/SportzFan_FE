import Link from 'next/link'

const Maintenance = () => {
  return (
    <div className="flex flex-col items-center">
      <Link href="/">
        <img src="/assets/images/adelaide-logo.svg" alt="Adelaide logo" className="w-180 cursor-pointer" />
      </Link>
      <div className="w-full h-36" />
      <p className="text-24 leading-18 text-sf-gray-300">Site under maintenance</p>
      <p className="text-16 leading-18 text-sf-gray-300 mt-10">We will be back up and running shortly</p>
    </div>
  )
}

export default Maintenance
