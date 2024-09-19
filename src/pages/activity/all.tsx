import MainPageLayout from 'components/Layouts/MainPage'
import Activities from 'views/Activity/All'

const ActivitiesPage = () => {
  return <Activities />
}

ActivitiesPage.title = 'My Activity'
ActivitiesPage.Layout = MainPageLayout

export default ActivitiesPage
