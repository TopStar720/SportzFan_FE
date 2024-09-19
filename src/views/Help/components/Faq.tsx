import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'

const Faq = () => {
  return (
    <Fragment>
      <p className="text-24 sm:text-30 text-sf-gray-300 font-bold text-center">Frequently Asked Questions</p>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>What are fan tokens?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              Fan tokens are the game currency of the platform. Tokens behave like loyalty points and can be earned or
              bought by a user on the platform. Tokens hold a value and can be redeemed for items (or assets) on the
              Marketplace.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>How do I earn fan tokens?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              Fan tokens can be earned through completing a variety of actions or achieving certain win states. Tokens
              can be earned by being a winner of a game (trivia, predictor, mini game etc), completing a challenge (such
              as a survey, referral, social share) or interacting with reward content (such as sponsor ads or games).
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>What can I do with fan tokens?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              Fan tokens can be redeemed for items offered on the Marketplace. They can also act as a gateway to
              accessing certain games, challenges or content eg. You need to own 1000 tokens to vote in a Poll.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Is a fan token an NFT?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              No, our fan token is not an NFT. Our fan token is a fungible token, meaning that the value of one token
              equals the same as the value of another token (like a $1 bill having the same value as another $1 bill).
              Non fungible tokens (NFTs) each have a unique value from one another, with not one NFT being the same as
              the other.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Do the tokens have an expiration date?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              No, tokens do not have an expiration date.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Can I buy fan tokens?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              Yes, you can buy fan tokens. To buy fan tokens: Go to the My Wallet section by selecting My Wallet from
              the side menu. Click the button “Buy” at the top of the screen. Enter the amount you wish to pay in $AUD
              (you will see how many tokens you will receive). Click Pay Now. Enter your credit card information and
              click “Pay Now”
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Can I request a refund?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              We will take into consideration refunds upon request. We consider every request made however cannot
              guarantee a refund in each instance. Please contact us at hello@sportzfan.io for any refund enquiries.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Is my payment secured? </span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              Yes, your payment is secured through Stripe. The platform does not store any credit card details. To learn
              more about Stripe’s PCI compliance please visit{' '}
              <a
                href="https://stripe.com/docs/security#:~:text=HTTPS%20and%20HSTS%20for%20secure,TLS%20certificates%20on%20each%20connection"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline"
              >
                Security at Stripe
              </a>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>How much is a token worth?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              Each token is worth $0.001 AUD. This price will always be fixed and not change. Unlike other platforms,
              where tokens go up or down in price, our token will always remain the same price.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>What are KUDOS points?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              KUDOS points are the status credits on the platform. Each time you interact with the platform (like play a
              game or complete a challenge) you earn KUDOS points. KUDOS points are a reflection of your fan rating and
              determine what level of membership you are allocated to on the platform. As you build your KUDOS points
              you can unlock higher membership tiers which offer you more benefits. KUDOS points also determine your
              rank on the leaderboard, which allows you to rank yourself against other fans and compete to win prizes as
              determined by your ranking.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>What is the leaderboard?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              The leaderboard shows the ranking of each fan, as determined by the number of kUDOS points they have
              earned. The main leaderboard shows the rating of fans over the duration of the season. You might see
              different leaderboards pop up during the season and outside the season also eg. monthly leaderboards,
              leaderboards based on games won etc.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Can you redeem items (assets) with KUDOS points?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              No, KUDOS points are not redeemable for items. Only tokens can be redeemed for items.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>What do the membership tier levels mean?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              Membership tier levels are like any traditional membership model. A tier level will dictate what benefits
              you receive for unlocking that tier. There are 4 tier levels which you can work towards, as you build up
              your KUDOS points. As you reach different levels, you unlock benefits like discounts on Marketplace items,
              access to exclusive games or challenges or access to the more premium VIP experiences available.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>What is a game?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              On the platform you will be able to play a variety of games. These include trivia based games, predictor
              games, quizzes and more. We are continually adding more games to play to enhance your fan experience. If
              you have a game you would like us to add, please email us at hello@sportzfan.io
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Are games free to play?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              All games are free to play. On occasion, you may be required to either hold a certain amount of tokens or
              KUDOS in your account or complete a certain action to unlock the game eg. check-in to X match/event to
              ulock Trivia game Y.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>What is a challenge?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              A challenge is an action that you can complete to earn rewards. Challenges include things like completing
              a check-in at a match, completing a survey, referring a friend to sign-up or completing a combination of
              different actions to win. Each challenge completion will earn you a certain number of KUDOS, tokens or
              even bonus rewards in some instances.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>What is a poll?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              A poll is a voting event where you as a fan get the chance to vote on a decision and have a binding
              influence on that decision. We will make available various polls for our fans to vote on eg. vote for the
              team song to come out to, who should be the MVP of a match etc. The most popular vote as decided by all
              those who participated will be implemented by the team.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>How do I redeem items with my tokens?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              <p>Redeeming items (or “assets”) as seen on the Marketplace is very simple.</p>
              <p className="ml-12">Click on “Marketplace” on the side menu</p>
              <p className="ml-12">
                Select which item you wish to redeem under either the Team Offers or Sponsor Offers tab.
              </p>
              <p className="ml-12">{`Click on the Redeem button (or go to Details > Redeem as alternative option)`}</p>
              <p className="ml-12">Click “Yes” to confirm the redemption</p>
              <p className="ml-12">
                Once confirmed, the tokens redeemed will be deducted from your account balance and the item (asset) will
                be added to your wallet in the My Assets section.
              </p>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Can I withdraw my tokens for cash?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              No, at this stage you cannot withdraw your tokens for cash. Tokens can only be used to redeem for items on
              the Marketplace.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Can I earn tokens by referring a friend?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              Yes, you can earn tokens by referring a friend, as well as KUDOS. If you refer enough friends, you will be
              sent a bonus reward on top of the KUDOS earned.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>Can I transfer my tokens to a friend?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              For the moment, we do not have the ability to send tokens to a friend. However, this is a feature that
              will be built into the platform in the future.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>What is an asset?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              An asset is an item which you can either redeem with your tokens on the marketplace or win as a bonus
              reward for certain actions or events. Assets include things like team merchandise, VIP experiences, game
              tickets or memberships and also sponsor offers like discounts or coupons.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>How do I claim an asset or one of my items?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              <p>There are 2 ways to claim an item that you have redeemed.</p>
              <p>
                For items or assets that are to be claimed online eg. ticket that you purchase online, the claim process
                is as follows:
              </p>
              <p className="ml-12">
                Locate your asset/item by going to My Rewards and then clicking “View Assets” on the My Assets card.
              </p>
              <p className="ml-12">On the asset you wish to claim, click the View button of that asset.</p>
              <p className="ml-12">View the details of how to claim under “Claim Details”</p>
              <p className="ml-12">
                Proceed to follow these instructions to claim the item eg. enter coupon code on website checkout to
                claim.
              </p>
              <p>
                For items or assets that need to be claimed in person eg. a team cap at a merchandise store, the claim
                process is as follows.
              </p>
              <p className="ml-12">
                Locate your asset/item by going to My Rewards and then clicking “View Assets” on the My Assets card.
              </p>
              <p className="ml-12">On the asset you wish to claim, click the View button of that asset.</p>
              <p className="ml-12">View the details of how to claim under “How To Claim”</p>
              <p className="ml-12">Click the “Claim Now” button</p>
              <p className="ml-12">
                While showing the merchant or vendor, press and hold the “Press and Hold to Claim” button until the
                progress bar hits 100% complete.
              </p>
              <p className="ml-12">The vendor will confirm this claim and proceed to process the claim.</p>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-[4px] bg-secondary-light border border-sf-zinc-600 px-22 py-16 my-16 text-14 sm:text-16 text-left text-sf-gray-300">
              <span>How do I contact support if I cannot get the answer I need from FAQs?</span>
              <img src={`/assets/images/${open ? 'minus' : 'plus'}.svg`} alt="" className="w-28" />
            </Disclosure.Button>
            <Disclosure.Panel className="rounded-[4px] bg-sf-rose-700/20 border border-sf-rose-700 pl-22 pr-40 py-20 text-12 text-sf-zinc-400 font-poppins">
              Please contact us at hello@sportzfan.io for any queries or concerns.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </Fragment>
  )
}

export default Faq
