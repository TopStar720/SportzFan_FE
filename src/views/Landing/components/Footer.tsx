import Link from 'next/link'
import Seperator from './Seperator'

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col sm:flex-row justify-center items-center py-60">
        <img src="/assets/images/adelaide-logo.svg" alt="Adelaide logo" className="h-48 sm:h-98" />
        <div className="mt-40 sm:mt-0 sm:ml-100 text-center sm:text-left">
          <p className="text-20 text-white leading-24">About</p>
          <div className="md:flex mt-20 sm:mt-30">
            <div>
              <Link href="/">
                <p className="text-18 text-white/70 font-archivo leading-20 cursor-pointer">How it Works</p>
              </Link>
              <Link href="/privacy">
                <p className="text-18 text-white/70 font-archivo leading-20 mt-20 cursor-pointer">Privacy Policy</p>
              </Link>
              <Link href="/terms">
                <p className="text-18 text-white/70 font-archivo leading-20 mt-20 cursor-pointer">Terms & Conditions</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Seperator />
      <div className="flex justify-center py-20">
        <p className="text-sf-slate-300 font-archivo leading-24">©2022 SparkUp Studios, All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
