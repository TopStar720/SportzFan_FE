import { SvgIcon, IconProps } from 'components/Icon'

const Info = ({ color }: IconProps) => {
  return (
    <SvgIcon width="20" height="21" viewBox="0 0 20 21" fill="none">
      <path
        d="M10 3C5.85787 3 2.5 6.35786 2.5 10.5C2.5 14.6421 5.85786 18 10 18C14.1421 18 17.5 14.6421 17.5 10.5C17.5 6.35786 14.1421 3 10 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 11.3334L10 7.16671" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10.0415 13.8334L9.95817 13.8334L9.95817 13.75L10.0415 13.75L10.0415 13.8334Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}

export default Info
