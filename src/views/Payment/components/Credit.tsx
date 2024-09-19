import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { classNames } from 'utils'
import SuccessModal from './SuccessModal'
import { CreatePaymentResponse } from './types'
import { setLoading } from '../../../store/app'
import { createPayment, verifyPayment } from '../../../apis/payment'

interface CreditProps {
  amount: string | string[]
}

type CreditData = {
  name: string
}

const enum IconStyle {
  solid = 'solid',
  default = 'default',
}

const CARD_OPTIONS = {
  iconStyle: IconStyle.solid,
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#cad4d8',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '12px',
      lineHeight: '18px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#cad4d8',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
}

const Credit = ({ amount }: CreditProps) => {
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [data, setData] = useState<CreditData>({ name: '' })
  const [tokenAmount, setTokenAmount] = useState(0)
  const [validations, setValidations] = useState<CreditData>({ name: '' })
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const onChange = (type: string, value: string) => {
    setData((prevState) => ({ ...prevState, [type]: value }))
    setValidations((prevState) => ({ ...prevState, [type]: '' }))
  }

  const handleCardDetailsChange = (event) => {
    event.error ? setErrorMessage(event.error.message) : setErrorMessage('')
  }

  const handlePay = async (event) => {
    event.preventDefault()
    const cardElement = elements.getElement('card')
    if (!data.name) {
      setValidations((prevState) => ({ ...prevState, name: 'empty' }))
    } else {
      if (!stripe || !elements) {
        return
      }

      dispatch(setLoading(true))
      const strAmount = typeof amount === 'string' ? amount : amount[0]
      createPayment({ ...data, amount: parseFloat(strAmount) })
        .then(async (res: CreatePaymentResponse) => {
          const billingDetails = {
            name: data.name,
          }

          const paymentMethodReq = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails,
          })

          if (paymentMethodReq.error) {
            setErrorMessage(paymentMethodReq.error.message)
            dispatch(setLoading(false))
            return
          }

          const { error } = await stripe.confirmCardPayment(res.clientSecret, {
            payment_method: paymentMethodReq.paymentMethod.id,
          })

          if (error) {
            setErrorMessage(error.message)
            dispatch(setLoading(false))
            return
          }

          verifyPayment({ logId: res.logId })
            .then((result) => {
              setTokenAmount(parseFloat(result.tokenAmount))
              dispatch(setLoading(false))
              setShowSuccessModal(true)
            })
            .catch(() => {
              setErrorMessage('Failed to verify payment using stripe.')
              dispatch(setLoading(false))
            })
        })
        .catch(() => {
          setErrorMessage('Failed to create payment using stripe.')
          dispatch(setLoading(false))
        })
    }
  }

  return (
    <Fragment>
      <form
        onSubmit={handlePay}
        className="stripe-form w-308px lg:w-600px border border px-4 lg:px-8 py-6 lg:py-10 m-auto"
      >
        <div className="w-full bg-info border border-sf-zinc-600 rounded-[4px] px-20 xs:px-46 py-20 xs:py-30">
          <p className="text-14 text-sf-gray-300">Enter card information</p>
          <div className="w-full h-12" />
          <div></div>
          <div>
            <label htmlFor="name-on-card" className="block mb-6 text-10 text-white/60 font-poppins">
              Name on card
            </label>
            <input
              className={classNames(
                'w-full h-36 bg-transparent border rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins',
                !validations.name ? 'border-sf-zinc-600' : 'border-sf-rose-700',
              )}
              id="name-on-card"
              placeholder="Name on card"
              value={data.name}
              onChange={(e) => onChange('name', e.target.value)}
            />
            {!!validations.name ? (
              <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">
                Name on card is required
              </span>
            ) : null}
          </div>
          <div className="w-full h-12" />
          <div>
            <label className="block mb-6 text-10 text-white/60 font-poppins">Card information</label>
            <CardElement options={CARD_OPTIONS} onChange={handleCardDetailsChange} />
          </div>
          {!!errorMessage ? (
            <>
              <div className="w-full h-20" />
              <p className="text-12 text-sf-rose-700 font-poppins">{errorMessage}</p>
            </>
          ) : null}
        </div>
        <div className="w-full h-30 xs:h-42" />
        <button className="w-full xs:w-180 bg-danger rounded-[4px] py-10 block m-auto text-14 text-white uppercase">
          A${amount} Pay Now
        </button>
        <SuccessModal show={showSuccessModal} balance={tokenAmount} onClose={() => setShowSuccessModal(false)} />
      </form>
    </Fragment>
  )
}

export default Credit
