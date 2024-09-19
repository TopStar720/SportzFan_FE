import { HandShakeIcon, PeopleIcon, RingIcon, TShirtIcon, VisaCardsIcon } from './Icons'
import JoinButton from './JoinButton'
import Slider from './Slider'

const AccessSection = () => {
  return (
    <div className="flex flex-col items-center py-80">
      <p className="text-20 sm:text-26 text-sf-yellow-300 text-center uppercase">Earn Access To</p>
      <p className="text-30 sm:text-38 text-white text-center uppercase">Exclusive Prizes, Content and Experiences</p>
      <div className="hidden md:grid grid-cols-6 gap-30 xl:gap-50 mt-70 mb-50">
        <div className="md:col-span-2 flex flex-col items-center text-center bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[15px] px-26 py-40">
          <div>
            <VisaCardsIcon />
          </div>
          <p className="text-24 text-white uppercase mt-14">VIP Passes</p>
          <p className="text-14 text-white/70 mt-2">
            Get early access to VIP passes and enjoy watching the match from the VIP Box
          </p>
        </div>
        <div className="md:col-span-2 flex flex-col items-center text-center bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[15px] px-26 py-40">
          <div>
            <TShirtIcon />
          </div>
          <p className="text-24 text-white uppercase mt-14">Signed Jersey</p>
          <p className="text-14 text-white/70 mt-2">Treat yourself to a jersey signed by your favourite player</p>
        </div>
        <div className="md:col-span-2 flex flex-col items-center text-center bg-gradient-to-b from-sf-zinc-900 to-sf-rose-700 rounded-[15px] px-26 py-40">
          <div>
            <HandShakeIcon />
          </div>
          <p className="text-24 text-white uppercase mt-14">MEET THE STARS</p>
          <p className="text-14 text-white/70 mt-2">
            Experience player introductions up close and personal while standing on field
          </p>
        </div>
        <div className="md:col-start-2 md:col-end-4 flex flex-col items-center text-center bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[15px] px-26 py-40">
          <div>
            <PeopleIcon />
          </div>
          <p className="text-24 text-white uppercase mt-14">GAME TICKETS</p>
          <p className="text-14 text-white/70 mt-2">Redeem the tokens you earn for discounts on game tickets</p>
        </div>
        <div className="md:col-start-4 md:col-end-6 flex flex-col items-center text-center bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[15px] px-26 py-40">
          <div>
            <RingIcon />
          </div>
          <p className="text-24 text-white uppercase mt-14">EXCLUSIVE CONTENT</p>
          <p className="text-14 text-white/70 mt-2">
            Win access to exclusive player interviews, videos and chats directly with the team.
          </p>
        </div>
      </div>
      <div className="block md:hidden w-full mb-4">
        <Slider>
          <div className="px-10 pt-20 pb-40">
            <div className="flex flex-col items-center text-center bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[15px] px-26 py-40">
              <div>
                <VisaCardsIcon />
              </div>
              <p className="text-24 text-white uppercase mt-14">VIP Passes</p>
              <p className="text-14 text-white/70 mt-2">
                Get early access to VIP passes and enjoy watching the match from the VIP Box
              </p>
            </div>
          </div>
          <div className="px-10 pt-20 pb-40">
            <div className="flex flex-col items-center text-center bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[15px] px-26 py-40">
              <div>
                <TShirtIcon />
              </div>
              <p className="text-24 text-white uppercase mt-14">Signed Jersey</p>
              <p className="text-14 text-white/70 mt-2">Treat yourself to a jersey signed by your favourite player</p>
            </div>
          </div>
          <div className="px-10 pt-20 pb-40">
            <div className="flex flex-col items-center text-center bg-gradient-to-b from-sf-teal-800 to-sf-blue-1000 border border-sf-green-800 rounded-[15px] px-26 py-40">
              <div>
                <HandShakeIcon />
              </div>
              <p className="text-24 text-white uppercase mt-14">MEET THE STARS</p>
              <p className="text-14 text-white/70 mt-2">
                Experience player introductions up close and personal while standing on field
              </p>
            </div>
          </div>
          <div className="px-10 pt-20 pb-40">
            <div className="flex flex-col items-center text-center bg-success border border-sf-green-800 rounded-[15px] px-26 py-40">
              <div>
                <PeopleIcon />
              </div>
              <p className="text-24 text-white uppercase mt-14">GAME TICKETS</p>
              <p className="text-14 text-white/70 mt-2">Redeem the tokens you earn for discounts on game tickets</p>
            </div>
          </div>
          <div className="px-10 pt-20 pb-40">
            <div className="flex flex-col items-center text-center bg-success border border-sf-green-800 rounded-[15px] px-26 py-40">
              <div>
                <RingIcon />
              </div>
              <p className="text-24 text-white uppercase mt-14">EXCLUSIVE CONTENT</p>
              <p className="text-14 text-white/70 mt-2">
                Win access to exclusive player interviews, videos and chats directly with the team.
              </p>
            </div>
          </div>
        </Slider>
      </div>
      <JoinButton />
    </div>
  )
}

export default AccessSection
