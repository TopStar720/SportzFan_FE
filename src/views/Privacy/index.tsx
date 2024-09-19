import Link from 'next/link'
import PwaDownloadModal from 'components/PwaDownload/PwaDownloadModal'
import Footer from './components/Footer'
import Seperator from './components/Seperator'
import PrivacySection from './components/PrivacySection'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-sf-blue-1000">
      <div className="flex flex-col items-center bg-gradient-to-b from-sf-blue-1000 to-sf-rose-700">
        <div className="container">
          <header className="flex justify-center pt-20 sm:pt-72">
            <Link href="/">
              <img src="/assets/images/adelaide-logo.svg" alt="Adelaide logo" className="h-30 sm:h-80 cursor-pointer" />
            </Link>
          </header>
        </div>
        <div className="sm:hidden section-seperator mt-10">
          <Seperator />
        </div>
        <div className="container flex justify-center pt-80 pb-100 sm:pb-120">
          <p className="text-40 sm:text-60 text-white text-center uppercase">{'SportzFan - Privacy Policy'}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container">
          <PrivacySection />
        </div>
      </div>
      <div className="flex justify-center bg-gradient-to-b from-sf-blue-1000 to-sf-rose-700">
        <div className="container">
          <Seperator />
          <Footer />
        </div>
      </div>
      <PwaDownloadModal />
    </div>
  )
}

export default Privacy
