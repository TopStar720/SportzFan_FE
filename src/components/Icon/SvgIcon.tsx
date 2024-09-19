import { ReactNode } from 'react'

interface SvgProps {
  width: string
  height: string
  viewBox: string
  fill: string
  children: ReactNode
}

const SvgIcon = ({ width, height, viewBox, fill, children }: SvgProps) => {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fill}>
      {children}
    </svg>
  )
}

export default SvgIcon
