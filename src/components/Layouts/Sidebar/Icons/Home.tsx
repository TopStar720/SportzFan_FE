import { SvgIcon, IconProps } from 'components/Icon'

const Home = ({ color }: IconProps) => {
  return (
    <SvgIcon width="20" height="21" viewBox="0 0 20 21" fill="none">
      <path d="M1.6665 17.1666H18.3332" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M16.3823 8.58428L10.5489 3.48011C10.2347 3.2052 9.7656 3.2052 9.45141 3.48011L3.61808 8.58428C3.43723 8.74252 3.3335 8.97112 3.3335 9.21143V16.3333C3.3335 16.7935 3.70659 17.1666 4.16683 17.1666H7.50016C7.9604 17.1666 8.3335 16.7935 8.3335 16.3333V13C8.3335 12.5397 8.70659 12.1666 9.16683 12.1666H10.8335C11.2937 12.1666 11.6668 12.5397 11.6668 13V16.3333C11.6668 16.7935 12.0399 17.1666 12.5002 17.1666H15.8335C16.2937 17.1666 16.6668 16.7935 16.6668 16.3333V9.21143C16.6668 8.97112 16.5631 8.74252 16.3823 8.58428Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}

export default Home
