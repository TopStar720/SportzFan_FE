import Modal, { ModalProps } from 'components/Modal'
import { useAppSelector } from 'hooks'
import { useEffect, useState } from 'react'
import { dateToDateAndTime } from 'utils'
import { PlayTrivia, Trivia } from '../types'

interface TriviaResultModalProps extends ModalProps {
  trivia: Trivia
}

const TriviaResultModal = ({ show, onClose, trivia }: TriviaResultModalProps) => {
  const { id } = useAppSelector((state) => state.user).data
  const [myResult, setMyResult] = useState<PlayTrivia>()

  useEffect(() => {
    if (!!id && !!trivia) {
      setMyResult(trivia.playTrivia.find((item) => item.userId === id))
    }
  }, [id, trivia])

  return (
    <Modal show={show} onClose={onClose}>
      {!!myResult && !!trivia ? (
        <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-28 pb-34 px-20 sm:px-50">
          <p className="w-full text-22 font-poppins font-bold text-center text-golden">Your Results</p>
          <div className="w-full h-20" />
          <img src="/assets/images/balls-yellow.svg" alt="" className="w-38" />
          <div className="w-full h-12" />
          <p className="text-sf-gray-300 text-center font-bold">{trivia.title}</p>
          <div className="flex justify-center items-center">
            <p className="text-10 text-sf-gray-300 font-poppins text-center">{trivia.match?.title}</p>
            <div className="w-px h-20 bg-white/50 mx-16" />
            <p className="text-10 text-sf-gray-300 font-poppins">
              {trivia.end ? dateToDateAndTime(new Date(trivia.end)).date : ''}
            </p>
          </div>
          <div className="w-full h-14" />
          <div className="flex  items-start gap-30">
            <div>
              <p className="text-30 text-center text-golden font-bold">
                {myResult.score} / {trivia.triviaQuestions ? trivia.triviaQuestions.length : 5}
              </p>
              <p className="text-14 font-poppins text-center text-sf-gray-300">YOUR SCORE</p>
            </div>
            <div>
              <p className="text-30 text-center  text-golden font-bold">
                {String(Math.floor(myResult.takenTime / 60)).padStart(2, '0')} :{' '}
                {String(myResult.takenTime % 60).padStart(2, '0')}s
              </p>
              <p className="text-14 font-poppins text-center text-sf-gray-300">YOUR TIME</p>
            </div>
          </div>
          <div>
            <p className="text-30 text-center  text-golden font-bold">{myResult?.rank}</p>
            <p className="text-14 font-poppins text-center text-sf-gray-300">YOUR RANK</p>
            <p className="text-12 font-poppins text-center text-golden">OUT OF {trivia.totalCount}</p>
          </div>
          <div className="w-full h-14" />
          {myResult.isSent && (
            <div>
              <p className="text-center text-golden font-bold">You Win</p>
              <div className="w-full h-10" />
              <div className="flex justify-center items-center">
                <div className="drop-shadow-[0_0_12px_rgba(204,143,0,1)] w-full flex flex-col items-center">
                  <p className="point-name text-14 whitespace-nowrap">Kudos Points</p>
                  <div className="flex items-center mt-10">
                    <img src="/assets/images/decoration.svg" alt="" className="h-16" />
                    <span className="point-value font-bold text-24 leading-16 ml-2">{myResult.rewardKudos}</span>
                  </div>
                </div>
                <div className="w-px h-30 bg-white/50 ml-10 mr-20" />
                <div className="drop-shadow-[0_0_12px_rgba(204,37,71,1)] w-full flex flex-col items-center">
                  <p className="token-name text-14">Tokens</p>
                  <div className="flex items-center mt-10">
                    <img src="/assets/images/token.svg" alt="" className="h-16" />
                    <span className="token-value font-bold text-24 leading-16 ml-2">{myResult.rewardToken}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="w-full h-8" />
          <div className="flex items-center">
            <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Rewards sent to you by :</span>
            <img src={trivia.sponsor?.logo} alt="" className="h-80 ml-12" />
          </div>
          <div className="w-full h-14" />
          <button className="w-220 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">Ok</span>
          </button>
        </div>
      ) : null}
    </Modal>
  )
}

export default TriviaResultModal
