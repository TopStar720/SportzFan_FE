import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import RadialSeparators from './RadialSeparators'

interface ProgressbarProps {
  value: number
  className: string
}

const Progressbar = ({ value, className }: ProgressbarProps) => {
  return (
    <CircularProgressbarWithChildren
      value={value}
      text={`${value}%`}
      className={className}
      strokeWidth={14}
      styles={buildStyles({
        strokeLinecap: 'butt',
        textColor: '#ccd2d6',
        pathColor: '#169936',
        trailColor: '#6a6a6a',
      })}
    >
      <RadialSeparators
        count={16}
        style={{
          background: '#333027',
          width: '1.5px',
          height: `${14}%`,
        }}
      />
    </CircularProgressbarWithChildren>
  )
}

export default Progressbar
