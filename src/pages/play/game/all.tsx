import MainPageLayout from 'components/Layouts/MainPage'
import Games from 'views/Play/Game/All'

const GamesPage = () => {
  return <Games />
}

GamesPage.title = 'Games'
GamesPage.Layout = MainPageLayout

export default GamesPage
