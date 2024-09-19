import { Fragment, useState } from 'react'
import InviteModal from 'views/Play/components/InviteModal'
import InviteSuccessModal from 'views/Play/components/InviteSuccessModal'
import SuccessModal from './SuccessModal'
import { classNames } from 'utils'
import { playSurvey } from 'apis/challenge'
import Link from 'next/link'

const alphaArray = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

interface ControlSectionProps {
  challenge: any
  changedPlayedStatus: (value: boolean) => void
}

interface FreeAnswerType {
  questionId: string
  freeText: string
}

const ControlSection = ({ challenge, changedPlayedStatus }: ControlSectionProps) => {
  const [step, setStep] = useState(1)
  const [data, setData] = useState([])
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
  const [showInviteSuccessModal, setInviteSuccessModal] = useState<boolean>(false)

  // survey free text
  const maxTextCount = 200
  const [currentTextCount, setCurrentTextCount] = useState(0)

  const validate = () => {
    if (challenge.isOptional) {
      const answers = data.filter((d) => d.questionId === challenge?.surveyQuestions[step - 1].id)
      if (answers.length > 0) return true
      return false
    } else {
      // survey free text
      const answer: FreeAnswerType = data.find(
        (d: FreeAnswerType) => d.questionId === challenge?.surveyQuestions[step - 1].id,
      )
      if (!answer) return false
      if (answer.freeText === '') return false

      return true
    }
  }

  const toggleSurvey = (questionId: string, optionId: string) => {
    const idx = data.findIndex((d) => d.optionId === optionId)
    if (idx === -1) {
      if (validate()) {
        const existingIdx = data.findIndex((d) => d.questionId === questionId)
        const temp = [...data]
        temp[existingIdx].optionId = optionId
        setData(temp)
      } else {
        const temp = [...data, { questionId: questionId, optionId: optionId }]
        setData(temp)
      }
    } else {
      const temp = [...data]
      temp.splice(idx, 1)
      setData(temp)
    }
  }

  const handleUpdate = (questionId: string, freeText: string) => {
    if (freeText.length > maxTextCount) return

    const idx = data.findIndex((d) => d.questionId === questionId)
    if (idx !== -1) {
      const temp = [...data]
      temp[idx].freeText = freeText
      setCurrentTextCount(freeText.length)
      setData(temp)
    } else {
      const temp = [...data, { questionId: questionId, freeText: freeText }]
      setData(temp)
    }
  }

  const handleNext = () => {
    if (step < challenge?.surveyQuestions.length) {
      setStep((prevState) => prevState + 1)
      if (!challenge.isOptional) {
        if (data[step]) {
          setCurrentTextCount(data[step].freeText.length)
        } else {
          setCurrentTextCount(0)
        }
      }
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      await playSurvey({
        surveyId: challenge?.id,
        answer: data,
      })
      setShowSuccessModal(true)
    } catch {}
  }

  const onInvite = () => {
    setShowSuccessModal(false)
    setTimeout(() => {
      setShowInviteModal(true)
    }, 100)
  }

  const handleInvite = (users: string[]) => {
    setShowInviteModal(false)
    setTimeout(() => {
      setInviteSuccessModal(true)
    }, 100)
  }

  return (
    <Fragment>
      <div className="border border-sf-zinc-600 bg-info rounded-[4px] relative overflow-hidden w-full flex flex-col items-center text-center px-20 sm:px-44 pt-28 pb-40">
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
          <img src="/assets/images/user-check-yellow.svg" alt="" className="w-208 opacity-20" />
        </div>
        <div className="relative flex flex-col items-center text-center">
          <div className="flex items-center">
            <span className="text-12 sm:text-14 text-sf-zinc-400 font-poppins leading-10">Question :</span>
            <span className="text-12 sm:text-14 text-sf-gray-300 leading-12 ml-6">{`${step}/${challenge?.surveyQuestions.length}`}</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-18 sm:text-20 leading-26 text-sf-gray-300 mt-20 sm:mt-24">
              {challenge?.surveyQuestions[step - 1]?.question}
            </p>
            <div className="w-full h-30" />
            {challenge?.isOptional ? (
              <div className="w-full sm:w-auto grid sm:grid-cols-2 gap-x-30 gap-10 sm:gap-y-20">
                {challenge?.surveyQuestions[step - 1]?.options.map((option: any, idx: number) => (
                  <button
                    key={option.id}
                    className={classNames(
                      'sm:max-w-200 w-full rounded-[4px] px-16 py-10 text-left m-auto border',
                      data.map((d) => d.optionId).includes(option.id)
                        ? 'border-sf-green-500 bg-sf-green-500/20'
                        : 'border-sf-zinc-600',
                    )}
                    onClick={() => toggleSurvey(challenge?.surveyQuestions[step - 1].id, option.id)}
                  >
                    <span className="text-14 text-white uppercase leading-18">
                      {alphaArray[idx]}. {option.optionText}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="w-full">
                <div className="w-full">
                  <textarea
                    className="w-full max-height-75 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins"
                    id="survey-answer"
                    value={data[step - 1]?.freeText || ''}
                    placeholder="Enter answer here..."
                    onChange={(e) => handleUpdate(challenge?.surveyQuestions[step - 1]?.id, e.target.value)}
                  />
                </div>
                <div className="w-full flex justify-end">
                  <span
                    className={`text-12 font-poppins ${currentTextCount > 0 ? 'text-red-800' : 'text-sf-gray-300'}`}
                  >
                    {currentTextCount}/{maxTextCount}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-30" />
      <div className="flex">
        {step !== 1 ? (
          <button
            className="w-140 h-40 bg-secondary rounded-[4px] mr-20"
            onClick={() => setStep((prevState) => prevState - 1)}
          >
            <span className="text-14 text-white uppercase leading-18">Back</span>
          </button>
        ) : (
          <Link href={`/play/challenge/survey/${challenge.id}`}>
            <button className="w-140 h-40 bg-secondary rounded-[4px] mr-20">
              <span className="text-14 text-white uppercase leading-18">Back</span>
            </button>
          </Link>
        )}
        <button className="w-140 h-40 bg-danger rounded-[4px]" disabled={!validate()} onClick={handleNext}>
          <span className="text-14 text-white uppercase leading-18">
            {step === challenge?.surveyQuestions.length ? 'Submit' : 'next'}
          </span>
        </button>
      </div>
      <SuccessModal
        show={showSuccessModal}
        data={challenge}
        onClose={() => {
          setShowSuccessModal(false)
          changedPlayedStatus(true)
        }}
        onInvite={onInvite}
      />
      <InviteModal
        show={showInviteModal}
        onClose={() => {
          setShowInviteModal(false)
        }}
        onInvite={handleInvite}
      />
      <InviteSuccessModal show={showInviteSuccessModal} onClose={() => setInviteSuccessModal(false)} type="challenge" />
    </Fragment>
  )
}

export default ControlSection
