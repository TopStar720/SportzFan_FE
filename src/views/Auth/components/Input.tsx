import { ChangeEventHandler, KeyboardEventHandler, useId, useState } from 'react'
import { classNames } from 'utils'

interface InputProps {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>
  invalid: boolean
  required?: boolean
}

const Input = ({ label, type, placeholder, value, onChange, onKeyUp, invalid, required }: InputProps) => {
  const id = useId()
  const [visibility, setVisibility] = useState<boolean>(false)

  return (
    <div>
      <label htmlFor={id} className="block mb-6 text-12 leading-18 text-white/60 font-poppins">
        <span>{label}</span>
        {required ? <span className="text-sf-red-600">*</span> : null}
      </label>
      {type === 'password' ? (
        <div className="relative">
          <input
            className={classNames(
              'w-full h-50 bg-sf-neutral-900 rounded-[5px] px-16 text-14 leading-[21px] text-sf-gray-300 font-poppins',
              invalid ? 'border border-sf-red-500' : '',
            )}
            type={visibility ? 'text' : type}
            id={id}
            placeholder="Password"
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
          <div className="absolute h-full top-0 right-18 flex">
            <button className="h-fit m-auto" onClick={() => setVisibility((prevState) => !prevState)}>
              <img src={`/assets/images/${visibility ? 'eye' : 'eye-invisible'}.svg`} alt="" className="w-24" />
            </button>
          </div>
        </div>
      ) : (
        <input
          className={classNames(
            'w-full h-50 bg-sf-neutral-900 rounded-[5px] px-16 text-14 leading-[21px] text-sf-gray-300 font-poppins',
            invalid ? 'border border-sf-red-500' : '',
          )}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      )}
    </div>
  )
}

export default Input
