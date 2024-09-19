import { useStopwatch } from 'react-timer-hook'
import { getDateTimeString } from 'utils'
import Counter from '../components/Counter'
import { Prediction, PredictScores } from '../types'

interface ControlSectionProps {
  data: Prediction
  scores: PredictScores
  onChange: (type: string, value: number | string) => void
}

const ControlSection = ({ data, scores, onChange }: ControlSectionProps) => {
  const { minutes, seconds } = useStopwatch({ autoStart: true, offsetTimestamp: new Date() })
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`

  return (
    <div className="border border-sf-zinc-600 bg-info rounded-[4px] relative overflow-hidden w-full px-20 sm:px-54 pt-44 pb-80">
      <div className="absolute inset-0 w-full h-full flex justify-center items-center">
        <img src="/assets/images/vs-big.svg" alt="" className="w-208" />
      </div>
      <div className="relative flex flex-col items-center text-center">
        <div className="flex items-center">
          <span className="text-10 sm:text-12 text-sf-zinc-400 font-poppins leading-20">Time Taken:</span>
          <img
            src="/assets/images/clock-yellow.svg"
            alt=""
            className="w-24 sm:w-28 mx-8 sm:mx-10 drop-shadow-[0_0_8px_rgba(204,143,0,0.5)]"
          />
          <span className="text-16 sm:text-24 text-sf-gray-300 leading-20">{`${minuteTime}:${secondTime}`} sec</span>
        </div>
        <p className="text-18 sm:text-20 leading-26 text-sf-gray-300 mt-20 sm:mt-24">Input your prediction</p>
        <div className="w-full h-32" />
        <div className="flex">
          <div className="flex flex-col md:flex-row items-center">
            <img src={data?.match?.homeTeam?.logo} alt="" className="h-32 lg:h-70" />
            <div className="w-full md:w-42 h-10 md:h-full" />
            <Counter value={scores.mainPredictScore} onChange={(val) => onChange('mainPredictScore', val)} />
          </div>
          <img src="/assets/images/vs-yellow.svg" alt="" className="h-50 sm:h-70 lg:h-88 mx-6 sm:mx-20 lg:mx-50" />
          <div className="flex flex-col-reverse md:flex-row items-center">
            <Counter
              value={scores.oppositionPredictScore}
              onChange={(val) => onChange('oppositionPredictScore', val)}
            />
            <div className="w-full md:w-42 h-10 md:h-full" />
            <img src={data?.match?.awayTeam?.logo} alt="" className="h-32 lg:h-70" />
          </div>
        </div>
        <p className="text-12 leading-18 text-sf-yellow-700 font-poppins mt-24">
          Starts {getDateTimeString(data?.match?.start)}
        </p>
      </div>
    </div>
  )
}

export default ControlSection
