import Link from 'next/link'

const JoinButton = () => {
  return (
    <Link href="/register">
      <button className="bg-sf-green-400 rounded-[8px] px-30 py-12">
        <span className="text-14 text-sf-blue-1000 uppercase">Join Now</span>
      </button>
    </Link>
  )
}

export default JoinButton
