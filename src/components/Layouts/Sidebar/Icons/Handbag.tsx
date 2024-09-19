import { SvgIcon, IconProps } from 'components/Icon'

const Handbag = ({ color }: IconProps) => {
  return (
    <SvgIcon width="20" height="21" viewBox="0 0 20 21" fill="none">
      <path
        d="M15.1276 7.16663H4.87282C4.46545 7.16663 4.11779 7.46114 4.05082 7.86296L2.66194 16.1963C2.57728 16.7042 2.96898 17.1666 3.48393 17.1666H16.5165C17.0314 17.1666 17.4231 16.7042 17.3385 16.1963L15.9496 7.86296C15.8826 7.46114 15.535 7.16663 15.1276 7.16663Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.6665 7.16671C6.6665 5.32576 8.15889 3.83337 9.99984 3.83337C11.8408 3.83337 13.3332 5.32576 13.3332 7.16671"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}

export default Handbag
