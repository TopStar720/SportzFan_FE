import AccessSection from './components/AccessSection'
import Footer from './components/Footer'
import Header from './components/Header'
import IntroSection from './components/IntroSection'
import RewardsSection from './components/RewardsSection'
import Seperator from './components/Seperator'
import UltimateSection from './components/UltimateSection'

const Landing = () => {
  return (
    <div className="min-h-screen bg-sf-blue-1000">
      <div className="flex justify-center bg-gradient-to-b from-sf-blue-1000 to-sf-rose-700">
        <div className="container">
          <Header />
          <UltimateSection />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container">
          <IntroSection />
        </div>
      </div>
      <div className="flex justify-center bg-[url('/assets/images/dotted-pattern.svg')]">
        <div className="container">
          <RewardsSection />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container">
          <AccessSection />
        </div>
      </div>
      <div className="flex justify-center bg-gradient-to-b from-sf-blue-1000 to-sf-rose-700">
        <div className="container">
          <Seperator />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Landing
