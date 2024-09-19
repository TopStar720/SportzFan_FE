import { SvgIcon, IconProps } from 'components/Icon'

const Share = ({ color }: IconProps) => {
  return (
    <SvgIcon width="20" height="21" viewBox="0 0 20 21" fill="none">
      <path
        d="M15 18C16.3807 18 17.5 16.8807 17.5 15.5C17.5 14.1193 16.3807 13 15 13C13.6193 13 12.5 14.1193 12.5 15.5C12.5 16.8807 13.6193 18 15 18Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.5 11.75L12.5 14.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5 13C6.38071 13 7.5 11.8807 7.5 10.5C7.5 9.11929 6.38071 8 5 8C3.61929 8 2.5 9.11929 2.5 10.5C2.5 11.8807 3.61929 13 5 13Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.5 6.75L7.5 9.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15 8C16.3807 8 17.5 6.88071 17.5 5.5C17.5 4.11929 16.3807 3 15 3C13.6193 3 12.5 4.11929 12.5 5.5C12.5 6.88071 13.6193 8 15 8Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}

export default Share
