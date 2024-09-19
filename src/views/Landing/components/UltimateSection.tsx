import { useEffect } from 'react'
import Parallax from 'parallax-js'

const UltimateSection = () => {
  useEffect(() => {
    const scene = document.getElementById('scene')
    new Parallax(scene, {
      hoverOnly: true,
    })
  })

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-end relative py-40">
      <div className="text-center lg:text-left lg:absolute max-w-440 left-30 top-90">
        <p className="text-24 sm:text-34 text-sf-green-400 uppercase">Become the ultimate</p>
        <p className="text-40 sm:text-60 text-white uppercase">Giants Fan</p>
        <p className="text-14 font-archivo text-white/70 leading-20 mt-18 mb-40">
          Show your true fandom and play, compete and win exclusive VIP rewards, prizes and experiences.
        </p>
        <p className="text-14 text-white/70 leading-20">Our Sponsors:</p>
        <div className="flex justify-center lg:justify-start mt-12 mb-80 lg:mb-0">
          <img src="/assets/images/zambrero-logo.svg" alt="Zambrero logo" className="h-22 xs:h-auto" />
          <img
            src="/assets/images/full-hammer-logo.svg"
            alt="Full Hammer logo"
            className="h-22 xs:h-auto mx-10 xs:mx-20"
          />
          <img src="/assets/images/power-network-logo.svg" alt="Power Network logo" className="h-22 xs:h-auto" />
        </div>
      </div>
      <div id="scene">
        <img src="/assets/images/heroes.png" alt="Four baseballers" data-depth="0.5" className="md:h-520" />
      </div>
    </div>
  )
}

export default UltimateSection
