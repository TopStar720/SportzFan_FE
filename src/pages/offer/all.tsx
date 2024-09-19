import MainPageLayout from 'components/Layouts/MainPage'
import Offers from 'views/Offer/All'

const OffersPage = () => {
  return <Offers />
}

OffersPage.title = 'Latest Offers'
OffersPage.Layout = MainPageLayout

export default OffersPage
