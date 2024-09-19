import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const Slider = ({ children }) => {
  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      renderIndicator={(onClickHandler, isSelected, index) => {
        if (isSelected) {
          return <li className="inline-block w-8 h-8 rounded-full mx-8 bg-sf-green-400" />
        }
        return (
          <li
            className="inline-block w-8 h-8 rounded-full mx-8 border-slider-indicator"
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
          />
        )
      }}
    >
      {children}
    </Carousel>
  )
}

export default Slider
