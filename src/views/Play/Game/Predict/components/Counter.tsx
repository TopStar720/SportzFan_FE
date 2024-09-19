interface CounterProps {
  value: number | string
  onChange: (value: number | string) => void
}

const Counter = ({ value, onChange }: CounterProps) => {
  return (
    <div className="flex items-center bg-black/20 rounded-[5px] p-8">
      <button
        className="w-32 h-32 bg-secondary rounded-[4px] text-24 text-white leading-2"
        onClick={() => onChange(Math.max(Math.floor(Number(value) - 1), 0))}
      >
        -
      </button>
      <input
        type="number"
        className="w-50 text-20 text-white font-poppins text-center bg-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : Math.floor(Number(e.target.value)))}
      />
      <button
        className="w-32 h-32 bg-danger rounded-[4px] text-24 text-white leading-2"
        onClick={() => onChange(Math.floor(Number(value) + 1))}
      >
        +
      </button>
    </div>
  )
}

export default Counter
