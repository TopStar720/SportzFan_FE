import MainPageLayout from 'components/Layouts/MainPage'
import Profile from 'views/Profile'

const ProfilePage = () => {
  return <Profile />
}

ProfilePage.title = 'My Profile'
ProfilePage.Layout = MainPageLayout

export default ProfilePage
