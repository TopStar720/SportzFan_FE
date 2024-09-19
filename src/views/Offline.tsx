import Link from 'next/link'

const Offline = () => {
  return (
    <div className="flex flex-col items-center">
      <Link href="/">
        <img src="/assets/images/adelaide-logo.svg" alt="Adelaide logo" className="w-180 cursor-pointer" />
      </Link>
      <div className="w-full h-36" />
      <p className="text-24 leading-18 text-sf-gray-300">You are offline now</p>
    </div>
  )
}

export default Offline
