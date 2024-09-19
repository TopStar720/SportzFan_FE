import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex justify-between py-12">
      <Link href="/">
        <img src="/assets/images/adelaide-logo.svg" alt="Adelaide logo" className="h-40 sm:h-80 cursor-pointer" />
      </Link>
      <div className="flex">
        <Link href="/login">
          <button>
            <span className="text-14 text-sf-green-400 uppercase">Login</span>
          </button>
        </Link>
        <Link href="/register">
          <button className="ml-36">
            <span className="text-14 text-sf-green-400 uppercase">Sign Up</span>
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header
