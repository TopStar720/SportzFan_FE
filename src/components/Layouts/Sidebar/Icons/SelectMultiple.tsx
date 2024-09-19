import { SvgIcon, IconProps } from 'components/Icon'

const SelectMultiple = ({ color }: IconProps) => {
  return (
    <SvgIcon width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M2.25 6.75V15C2.25 15.4142 2.58579 15.75 3 15.75H11.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12.75L15 12.75C15.4142 12.75 15.75 12.4142 15.75 12L15.75 3C15.75 2.58579 15.4142 2.25 15 2.25L6 2.25C5.58579 2.25 5.25 2.58579 5.25 3L5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2803 6.53033C13.5732 6.23744 13.5732 5.76256 13.2803 5.46967C12.9874 5.17678 12.5126 5.17678 12.2197 5.46967L13.2803 6.53033ZM9.75 9L9.21967 9.53033C9.51256 9.82322 9.98744 9.82322 10.2803 9.53033L9.75 9ZM8.78033 6.96967C8.48744 6.67678 8.01256 6.67678 7.71967 6.96967C7.42678 7.26256 7.42678 7.73744 7.71967 8.03033L8.78033 6.96967ZM12.2197 5.46967L9.21967 8.46967L10.2803 9.53033L13.2803 6.53033L12.2197 5.46967ZM10.2803 8.46967L8.78033 6.96967L7.71967 8.03033L9.21967 9.53033L10.2803 8.46967Z"
        fill="#9C9CA4"
      />
    </SvgIcon>
  )
}

export default SelectMultiple
