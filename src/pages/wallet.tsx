import MainPageLayout from 'components/Layouts/MainPage'
import Wallet from 'views/Wallet'

const WalletPage = () => {
  return <Wallet />
}

WalletPage.title = 'My Wallet'
WalletPage.Layout = MainPageLayout

export default WalletPage
