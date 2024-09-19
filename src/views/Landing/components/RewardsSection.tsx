import JoinButton from './JoinButton'
import Slider from './Slider'

const RewardsSection = () => {
  return (
    <div className="flex flex-col items-center py-80">
      <p className="text-20 sm:text-26 text-sf-green-400 text-center uppercase">How you can earn</p>
      <p className="text-30 sm:text-38 text-white text-center uppercase">Tokens & Rewards</p>
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-36 lg:gap-18 2xl:gap-36 my-50">
        <div className="bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[20px] pb-40 lg:pb-20 xl:pb-30 2xl:pb-40">
          <div className="relative">
            <img src="/assets/images/shine-green.svg" alt="" className="!w-[86%] m-auto" />
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[60%]" />
            </div>
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/balls-green.svg" alt="" className="!w-[35%]" />
            </div>
          </div>
          <p className="text-18 lg:text-14 2xl:text-16 text-white text-center font-archivo mx-10 xl:mx-40 mt-0 lg:-mt-20 xl:mt-0">
            Participate in Games & Challenges
          </p>
        </div>
        <div className="bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[20px] pb-40 lg:pb-20 xl:pb-30 2xl:pb-40">
          <div className="relative">
            <img src="/assets/images/shine-green.svg" alt="" className="!w-[86%] m-auto" />
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[60%]" />
            </div>
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/chart-green.svg" alt="" className="!w-[35%]" />
            </div>
          </div>
          <p className="text-18 lg:text-14 2xl:text-16 text-white text-center font-archivo mx-10 xl:mx-30 mt-0 lg:-mt-20 xl:mt-0">
            Vote on team decisions and be rewarded for your input
          </p>
        </div>
        <div className="bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[20px] pb-40 lg:pb-20 xl:pb-30 2xl:pb-40">
          <div className="relative">
            <img src="/assets/images/shine-green.svg" alt="" className="!w-[86%] m-auto" />
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[60%]" />
            </div>
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/prediction-green.svg" alt="" className="!w-[35%]" />
            </div>
          </div>
          <p className="text-18 lg:text-14 2xl:text-16 text-white text-center font-archivo mx-10 xl:mx-20 mt-0 lg:-mt-20 xl:mt-0">
            Predict what will happen in a match and compete against your friends
          </p>
        </div>
        <div className="bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[20px] pb-40 lg:pb-20 xl:pb-30 2xl:pb-40">
          <div className="relative">
            <img src="/assets/images/shine-green.svg" alt="" className="!w-[86%] m-auto" />
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[60%]" />
            </div>
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/prize-green.svg" alt="" className="!w-[35%]" />
            </div>
          </div>
          <p className="text-18 lg:text-14 2xl:text-16 text-white text-center font-archivo mx-10 xl:mx-30 mt-0 lg:-mt-20 xl:mt-0">
            Check-In to a match to verify your attendance
          </p>
        </div>
      </div>
      <div className="block sm:hidden w-full mb-4">
        <Slider>
          <div className="px-10 pt-20 pb-40">
            <div className="bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[20px] pb-40 lg:pb-20 xl:pb-30 2xl:pb-40">
              <div className="relative">
                <img src="/assets/images/shine-green.svg" alt="" className="!w-[86%] m-auto" />
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[60%]" />
                </div>
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/balls-green.svg" alt="" className="!w-[35%]" />
                </div>
              </div>
              <p className="min-h-54 text-18 lg:text-14 2xl:text-16 text-white text-center font-archivo mx-10 xl:mx-40 mt-0 lg:-mt-20 xl:mt-0">
                Participate in Games & Challenges
              </p>
            </div>
          </div>
          <div className="px-10 pt-20 pb-40">
            <div className="bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[20px] pb-40 lg:pb-20 xl:pb-30 2xl:pb-40">
              <div className="relative">
                <img src="/assets/images/shine-green.svg" alt="" className="!w-[86%] m-auto" />
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[60%]" />
                </div>
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/chart-green.svg" alt="" className="!w-[35%]" />
                </div>
              </div>
              <p className="min-h-54 text-18 lg:text-14 2xl:text-16 text-white text-center font-archivo mx-10 xl:mx-30 mt-0 lg:-mt-20 xl:mt-0">
                Vote on team decisions and be rewarded for your input
              </p>
            </div>
          </div>
          <div className="px-10 pt-20 pb-40">
            <div className="bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[20px] pb-40 lg:pb-20 xl:pb-30 2xl:pb-40">
              <div className="relative">
                <img src="/assets/images/shine-green.svg" alt="" className="!w-[86%] m-auto" />
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[60%]" />
                </div>
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/prediction-green.svg" alt="" className="!w-[35%]" />
                </div>
              </div>
              <p className="min-h-54 text-18 lg:text-14 2xl:text-16 text-white text-center font-archivo mx-10 xl:mx-20 mt-0 lg:-mt-20 xl:mt-0">
                Predict what will happen in a match and compete against your friends
              </p>
            </div>
          </div>
          <div className="px-10 pt-20 pb-40">
            <div className="bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[20px] pb-40 lg:pb-20 xl:pb-30 2xl:pb-40">
              <div className="relative">
                <img src="/assets/images/shine-green.svg" alt="" className="!w-[86%] m-auto" />
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[60%]" />
                </div>
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/prize-green.svg" alt="" className="!w-[35%]" />
                </div>
              </div>
              <p className="min-h-54 text-18 lg:text-14 2xl:text-16 text-white text-center font-archivo mx-10 xl:mx-30 mt-0 lg:-mt-20 xl:mt-0">
                Check-In to a match to verify your attendance
              </p>
            </div>
          </div>
        </Slider>
      </div>
      <JoinButton />
    </div>
  )
}

export default RewardsSection
