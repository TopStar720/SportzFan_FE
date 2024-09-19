import { SvgIcon, IconProps } from 'components/Icon'

const User = ({ color }: IconProps) => {
  return (
    <SvgIcon width="20" height="20" viewBox="0 0 13 14" fill="none">
      <path
        d="M6.15234 0C4.1169 0 2.46094 1.65596 2.46094 3.69141C2.46094 5.72685 4.1169 7.38281 6.15234 7.38281C8.18779 7.38281 9.84375 5.72685 9.84375 3.69141C9.84375 1.65596 8.18779 0 6.15234 0Z"
        fill="url(#paint0_linear_3963_14437)"
      />
      <path
        d="M10.7452 9.79439C9.73454 8.76824 8.39478 8.20312 6.97266 8.20312H5.33203C3.90994 8.20312 2.57015 8.76824 1.55952 9.79439C0.553848 10.8155 0 12.1634 0 13.5898C0 13.8164 0.183641 14 0.410156 14H11.8945C12.121 14 12.3047 13.8164 12.3047 13.5898C12.3047 12.1634 11.7508 10.8155 10.7452 9.79439Z"
        fill="url(#paint1_linear_3963_14437)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3963_14437"
          x1="6.15234"
          y1="-5.76893e-08"
          x2="8.08808"
          y2="9.72366"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3963_14437"
          x1="6.15234"
          y1="8.20312"
          x2="6.89028"
          y2="16.0714"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}

export default User
