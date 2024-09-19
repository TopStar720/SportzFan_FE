import MainPageLayout from 'components/Layouts/MainPage'
import Notifications from 'views/Notification/All'

const NotificationsPage = () => {
  return <Notifications />
}

NotificationsPage.title = 'Notifications'
NotificationsPage.Layout = MainPageLayout

export default NotificationsPage
