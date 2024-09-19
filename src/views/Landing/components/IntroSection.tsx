import { CheckIcon, StarIcon, TrophyIcon, UserPlusIcon } from './Icons'
import JoinButton from './JoinButton'

const IntroSection = () => {
  return (
    <div className="flex flex-col items-center py-80">
      <p className="text-20 sm:text-26 text-sf-green-400 text-center uppercase">
        Be part of a completely new fan experience
      </p>
      <p className="text-30 sm:text-38 text-white text-center uppercase">Introducing AG Nation</p>
      <div className="flex flex-col lg:flex-row justify-center items-center my-50">
        <div className="relative min-w-364 h-340 bg-[url('/assets/images/token-container.png')] bg-contain bg-no-repeat">
          <div className="absolute inset-0 w-full h-full">
            <img src="/assets/images/token.svg" alt="Token" className="w-190 mx-auto mt-40 animate-spinning" />
          </div>
          <div className="absolute inset-0 w-full h-full">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-234 mx-auto mt-30" />
          </div>
        </div>
        <div className="ml-0 lg:ml-120">
          <div className="flex items-center">
            <div>
              <StarIcon />
            </div>
            <p className="text-white/70 font-archivo leading-20 ml-12">
              Play games, complete challenges and vote on team decisions to earn rewards.
            </p>
          </div>
          <div className="flex items-center mt-30">
            <div>
              <CheckIcon />
            </div>
            <p className="text-white/70 font-archivo leading-20 ml-10">
              Earn team tokens which act as a currency for you to redeem for exclusive prizes, content and experiences
            </p>
          </div>
          <div className="flex items-center mt-30">
            <div>
              <TrophyIcon />
            </div>
            <p className="text-white/70 font-archivo leading-20 ml-18">
              Battle it out against your friends and other fans to increase your fan rating
            </p>
          </div>
          <div className="flex items-center my-30">
            <div>
              <UserPlusIcon />
            </div>
            <p className="text-white/70 font-archivo leading-20 ml-12">
              Join a new community of fans that grow your team together
            </p>
          </div>
        </div>
      </div>
      <JoinButton />
    </div>
  )
}

export default IntroSection
