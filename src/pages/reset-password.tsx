import AuthPageLayout from 'components/Layouts/AuthPage'
import Reset from 'views/Auth/Reset'

const ResetPage = () => {
  return <Reset />
}

ResetPage.title = 'Reset Password'
ResetPage.Layout = AuthPageLayout

export default ResetPage
